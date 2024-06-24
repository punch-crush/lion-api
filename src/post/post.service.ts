import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model, Types } from 'mongoose';
import { PostRequest, PostResponse } from './dto/post-base.dto';
import {
	PostListResponseDto,
	PostReportResponseDto,
	PostResponseDto,
	PostSingleResponseDto,
} from './dto/post.dto';
import { UserService } from '@user/user.service';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post.name) private postModel: Model<PostDocument>,
		private userService: UserService,
	) {}

	async getPostById(postId: string): Promise<PostDocument> {
		if (!Types.ObjectId.isValid(postId)) {
			throw new HttpException('존재하지 않는 게시글입니다.', HttpStatus.NOT_FOUND);
		}
		const post = await this.postModel.findById(postId);
		if (!post) {
			throw new HttpException('존재하지 않는 게시글입니다.', HttpStatus.NOT_FOUND);
		}
		return post;
	}

	async compareAuthorAndUser(authorId: string, userId: string) {
		if (authorId !== userId) {
			throw new HttpException(
				'잘못된 요청입니다. 로그인 정보를 확인하세요.',
				HttpStatus.UNAUTHORIZED,
			);
		}
	}

	async increaseCommentCount(postId: string) {
		await this.getPostById(postId);
		await this.postModel.updateOne({ _id: postId }, { $inc: { commentCount: 1 } });
	}

	async decreaseCommentCount(postId: string) {
		const post = await this.getPostById(postId);
		if (post && post.commentCount > 0) {
			await this.postModel.updateOne({ _id: postId }, { $inc: { commentCount: -1 } });
		}
	}

	async getSinglePostResponse(
		post: PostDocument,
		currUserId: string,
	): Promise<PostResponse> {
		const author = await this.userService.getUserByIdResponse(post.author, currUserId);
		const newPost: PostResponse = {
			...post.readOnlyData,
			author,
		};
		return newPost;
	}

	async getPostListResponse(
		posts: PostDocument[],
		currUserId: string,
	): Promise<PostResponse[]> {
		const newPosts = await Promise.all(
			posts.map(post => this.getSinglePostResponse(post, currUserId)),
		);
		return newPosts;
	}

	async getAllPost(
		userId: string,
		limit: number,
		skip: number,
	): Promise<PostListResponseDto> {
		const posts = await this.postModel
			.find()
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip(skip);
		const postResponse = await this.getPostListResponse(posts, userId);
		return {
			posts: postResponse,
		};
	}

	async getUserPost(
		userId: string,
		accountname: string,
		limit: number,
		skip: number,
	): Promise<PostResponseDto> {
		const author = await this.userService.getUserByAccountName(accountname);
		const posts = await this.postModel
			.find({ author: author._id })
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip(skip);
		const postResponse = await this.getPostListResponse(posts, userId);
		return {
			post: postResponse,
		};
	}

	async getFeedPost(
		userId: string,
		limit: number,
		skip: number,
	): Promise<PostListResponseDto> {
		const author = await this.userService.getUserById(userId);
		const followingIds = author.following;
		const posts = await this.postModel
			.find({ author: { $in: followingIds } })
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip(skip);
		const postResponse = await this.getPostListResponse(posts, userId);
		return {
			posts: postResponse,
		};
	}

	async getPostDetail(userId: string, postId: string): Promise<PostSingleResponseDto> {
		const post = await this.getPostById(postId);
		const postResponse = await this.getSinglePostResponse(post, userId);
		return {
			post: postResponse,
		};
	}

	async createPost(userId: string, post: PostRequest): Promise<PostSingleResponseDto> {
		const { content, image } = post;
		if (!content && !image) {
			throw new HttpException('내용 또는 이미지를 입력해주세요.', HttpStatus.BAD_REQUEST);
		}
		const createdPost = new this.postModel({ ...post, author: userId });
		await createdPost.save();
		const postResponse = await this.getSinglePostResponse(createdPost, userId);
		return {
			post: postResponse,
		};
	}

	async updatePost(
		postId: string,
		userId: string,
		postRequest: PostRequest,
	): Promise<PostSingleResponseDto> {
		const post = await this.getPostById(postId);
		await this.compareAuthorAndUser(post.author, userId);
		const updatedPost = await this.postModel.findOneAndUpdate(
			{ _id: postId },
			{ ...postRequest, updatedAt: new Date() },
			{ new: true },
		);
		const postResponse = await this.getSinglePostResponse(updatedPost, userId);
		return {
			post: postResponse,
		};
	}

	async deletePost(postId: string, userId: string) {
		const post = await this.getPostById(postId);
		await this.compareAuthorAndUser(post.author, userId);
		await this.postModel.deleteOne({ _id: postId });
		return {
			message: '게시물이 성공적으로 삭제되었습니다.',
		};
	}

	async reportPost(postId: string): Promise<PostReportResponseDto> {
		const reportedPost = await this.getPostById(postId);
		return {
			report: {
				post: String(reportedPost._id),
			},
		};
	}

	async likePost(postId: string, userId: string): Promise<PostSingleResponseDto> {
		await this.getPostById(postId);
		const updatedPost = await this.postModel.findOneAndUpdate(
			{ _id: postId },
			{ $addToSet: { heart: userId } },
			{ new: true },
		);
		const postResponse = await this.getSinglePostResponse(updatedPost, userId);
		return {
			post: postResponse,
		};
	}

	async unlikePost(postId: string, userId: string): Promise<PostSingleResponseDto> {
		await this.getPostById(postId);
		const updatedPost = await this.postModel.findOneAndUpdate(
			{ _id: postId },
			{ $pull: { heart: userId } },
			{ new: true },
		);
		const postResponse = await this.getSinglePostResponse(updatedPost, userId);
		return {
			post: postResponse,
		};
	}
}
