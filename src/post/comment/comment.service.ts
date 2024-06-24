import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '@user/user.service';
import { Model } from 'mongoose';
import { CommentRequest, CommentResponse } from './dto/comment-base.dto';
import { Comment, CommentDocument } from './comment.schema';
import { CommentResponseDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
		private userService: UserService,
	) {}

	async getCommentResponse(newComment: CommentDocument): Promise<CommentResponse> {
		const { authorId } = newComment;
		const author = await this.userService.getUserById(authorId);

		return {
			...newComment.readOnlyData,
			author: {
				...author.readOnlyData,
				isfollow: false,
			},
		};
	}

	async createComment(
		postId: string,
		comment: CommentRequest,
		authorId: string,
	): Promise<CommentResponseDto> {
		const { content } = comment;
		if (!content) {
			throw new HttpException('댓글을 입력해주세요.', HttpStatus.BAD_REQUEST);
		}

		const createdComment = new this.commentModel({ postId, content, authorId });
		await createdComment.save();

		const commentResponse = await this.getCommentResponse(createdComment);
		return {
			comment: commentResponse,
		};
	}

	// async getCommentList(postId: string, userId: string) {
	// 	void userId;
	// 	const post = await this.commentModel.findOne({ postId: postId });
	// 	const commentResponse = await Promise.all(
	// 		post.comments.map(async el => await this.getCommentResponse(el)),
	// 	);
	// 	return {
	// 		comment: commentResponse,
	// 	};
	// }

	// async deleteComment(postId: string, commentId: string, userId: string) {
	// 	void userId;
	// 	const post = await this.commentModel.findOne({ postId: postId });
	// 	if (!post) {
	// 		throw new HttpException('해당 포스트를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
	// 	}
	// 	const index = post.comments.findIndex(
	// 		comment => comment._id.toString() === commentId,
	// 	);
	// 	if (index === -1) {
	// 		throw new HttpException('해당 댓글을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
	// 	}
	// 	post.comments.splice(index, 1);
	// 	await post.save();
	// 	return {
	// 		message: '댓글이 성공적으로 삭제되었습니다.',
	// 	};
	// }
}
