import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';
import { PostRequest, PostResponse } from './dto/post-base.dto';
import {
	PostListResponseDto,
	PostResponseDto,
	PostSingleResponseDto,
} from './dto/post.dto';
import { User, UserDocument } from '@user/user.schema';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post.name) private postModel: Model<PostDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async getSinglePostResponse(post: PostDocument): Promise<PostResponse> {
		const author = await this.userModel.findById(post.author);
		if (!author) {
			throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
		}
		const newPost: PostResponse = {
			...post.readOnlyData,
			author: author.readOnlyData,
		};
		return newPost;
	}

	async getPostListResponse(posts: PostDocument[]): Promise<PostResponse[]> {
		const newPosts = await Promise.all(
			posts.map(post => this.getSinglePostResponse(post)),
		);
		return newPosts;
	}

	async getAllPost(limit: number, skip: number): Promise<PostListResponseDto> {
		const posts = await this.postModel.find().limit(limit).skip(skip);
		const postResponse = await this.getPostListResponse(posts);
		return {
			posts: postResponse,
		};
	}

	async getUserPost(
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
		const postResponse = await this.getPostListResponse(posts);
		return {
			post: postResponse,
		};
	}

	async getFeedPost(
		id: string,
		limit: number,
		skip: number,
	): Promise<PostListResponseDto> {
		const author = await this.userModel.findById(id);
		if (!author) {
			throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
		}
		const followingIds = author.following;
		const posts = await this.postModel
			.find({ author: { $in: [followingIds] } })
			.limit(limit)
			.skip(skip);
		const postResponse = await this.getPostListResponse(posts);
		return {
			posts: postResponse,
		};
	}

	async getPostDetail(postId: string): Promise<PostSingleResponseDto> {
		const post = await this.postModel.findOne({ _id: postId });
		const postResponse = await this.getSinglePostResponse(post);
		return {
			post: postResponse,
		};
	}

	async createPost(post: PostRequest, id: string): Promise<PostSingleResponseDto> {
		const { content, image } = post;
		if (!content && !image) {
			throw new HttpException('내용 또는 이미지를 입력해주세요.', HttpStatus.BAD_REQUEST);
		}
		const createdPost = new this.postModel({ ...post, author: id });
		await createdPost.save();
		const postResponse = await this.getSinglePostResponse(createdPost);
		return {
			post: postResponse,
		};
	}
}
