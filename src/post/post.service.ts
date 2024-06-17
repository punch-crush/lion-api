import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';
import { PostRequest } from './dto/post-base.dto';
import { PostSingleResponseDto } from './dto/post.dto';

@Injectable()
export class PostService {
	constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

	async createPost(post: PostRequest): Promise<PostSingleResponseDto> {
		const createdPost = new this.postModel(post);
		return createdPost.save();
	}
}
