import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';
import { PostRequest, PostResponse } from './dto/post-base.dto';
import {
	PostListResponseDto,
	PostReportResponseDto,
	PostResponseDto,
	PostSingleResponseDto,
} from './dto/post.dto';
import { User, UserDocument } from '@user/user.schema';
import { getIsFollow } from 'src/util/helper';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post.name) private postModel: Model<PostDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async getSinglePostResponse(
		post: PostDocument,
		currUserId: string,
	): Promise<PostResponse> {
		const author = await this.userModel.findById(post.author);
		if (!author) {
			throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
		}
		const newPost: PostResponse = {
			...post.readOnlyData,
			author: {
				...author.readOnlyData,
				isfollow: getIsFollow(author, currUserId),
			},
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
		const posts = await this.postModel.find().limit(limit).skip(skip);
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
		const author = await this.userModel.findOne({ accountname });
		if (!author) {
			throw new HttpException('해당 계정이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
		}
		const posts = await this.postModel
			.find({ author: author._id })
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
		const author = await this.userModel.findOne({ _id: userId });
		if (!author) {
			throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
		}
		const followingIds = author.following;
		console.log(followingIds);
		const posts = await this.postModel
			.find({ author: { $in: followingIds } })
			.limit(limit)
			.skip(skip);
		const postResponse = await this.getPostListResponse(posts, userId);
		return {
			posts: postResponse,
		};
	}

	async getPostDetail(userId: string, postId: string): Promise<PostSingleResponseDto> {
		const post = await this.postModel.findOne({ _id: postId });
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
		post: PostRequest,
	): Promise<PostSingleResponseDto> {
		const updatedPost = await this.postModel.findByIdAndUpdate(
			postId,
			{ ...post, updatedAt: new Date() },
			{ new: true },
		);
		if (!updatedPost) {
			throw new HttpException('존재하지 않는 게시글입니다.', HttpStatus.NOT_FOUND);
		}
		if (updatedPost.author !== userId) {
			throw new HttpException(
				'잘못된 요청입니다. 로그인 정보를 확인하세요.',
				HttpStatus.UNAUTHORIZED,
			);
		}
		const postResponse = await this.getSinglePostResponse(updatedPost, userId);
		return {
			post: postResponse,
		};
	}

	async deletePost(postId: string, userId: string) {
		const deletedPost = await this.postModel.findByIdAndDelete(postId);
		if (!deletedPost) {
			throw new HttpException('게시물을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
		}
		if (deletedPost.author !== userId) {
			throw new HttpException('삭제 권한이 없습니다.', HttpStatus.UNAUTHORIZED);
		}
		return {
			message: '게시물이 성공적으로 삭제되었습니다.',
		};
	}

	async reportPost(postId: string): Promise<PostReportResponseDto> {
		const reportedPost = await this.postModel.findById(postId);
		if (!reportedPost) {
			throw new HttpException('게시물을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
		}
		return {
			report: {
				post: postId,
			},
		};
	}
}
