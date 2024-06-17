import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRequest } from './dto/post-base.dto';
import { PostSingleResponseDto } from './dto/post.dto';

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	async createPost(@Body() post: PostRequest): Promise<PostSingleResponseDto> {
		return this.postService.createPost(post);
	}
}
