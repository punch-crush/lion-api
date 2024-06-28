import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '@user/user.service';
import { Model } from 'mongoose';
import { CommentRequest, CommentResponse } from './dto/comment-base.dto';
import { Comment, CommentDocument } from './comment.schema';
import { CommentListResponseDto, CommentResponseDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
		private userService: UserService,
	) {}

	async getCommentResponse(
		newComment: CommentDocument,
		userId: string,
	): Promise<CommentResponse> {
		const { authorId } = newComment;
		const author = await this.userService.getUserByIdResponse(authorId, userId);

		return {
			...newComment.readOnlyData,
			author,
		};
	}

	async createComment(
		postId: string,
		comment: CommentRequest,
		userId: string,
	): Promise<CommentResponseDto> {
		const { content } = comment;
		const createdComment = new this.commentModel({ postId, content, authorId: userId });
		await createdComment.save();
		const commentResponse = await this.getCommentResponse(createdComment, userId);
		return {
			comments: commentResponse,
		};
	}

	async getCommentList(
		postId: string,
		userId: string,
		limit: number,
		skip: number,
	): Promise<CommentListResponseDto> {
		const comments = await this.commentModel
			.find({ postId: postId })
			.skip(skip)
			.limit(limit);
		const commentResponse = await Promise.all(
			comments.map(async el => await this.getCommentResponse(el, userId)),
		);
		return {
			comments: commentResponse,
		};
	}

	async deleteComment(commentId: string, userId: string) {
		const comment = await this.commentModel.findById(commentId);
		if (!comment) {
			throw new HttpException('댓글이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
		}
		if (comment.authorId !== userId) {
			throw new HttpException(
				'댓글 작성자만 댓글을 삭제할 수 있습니다.',
				HttpStatus.UNAUTHORIZED,
			);
		}
		await this.commentModel.deleteOne({ _id: commentId });
		return {
			message: '댓글이 삭제되었습니다.',
		};
	}

	async reportComment(commentId: string) {
		const comment = await this.commentModel.findById(commentId);
		if (!comment) {
			throw new HttpException('댓글이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
		}
		return {
			report: {
				comment: commentId,
			},
		};
	}
}
