import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Req,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
	PostListResponseDto,
	PostRequestDto,
	PostResponseDto,
	PostSingleResponseDto,
} from './dto/post.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';

@Controller()
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get('/')
	@UseGuards(JwtAuthGuard)
	async getAllPost(
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@Req() req,
	): Promise<PostListResponseDto> {
		if (!req.user) {
			throw new UnauthorizedException();
		}
		const limitValue = limit ? parseInt(limit) : 10;
		const skipValue = skip ? parseInt(skip) : 0;
		return this.postService.getAllPost(limitValue, skipValue);
	}

	@Get('/feed')
	@UseGuards(JwtAuthGuard)
	async getFeedPost(
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@Req() req,
	): Promise<PostListResponseDto> {
		if (!req.user) {
			throw new UnauthorizedException();
		}
		const limitValue = limit ? parseInt(limit) : 10;
		const skipValue = skip ? parseInt(skip) : 0;
		return this.postService.getFeedPost(req.user.id, limitValue, skipValue);
	}

	@Get(':accountname/userpost')
	@UseGuards(JwtAuthGuard)
	async getUserPost(
		@Param('accountname') accountname: string,
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@Req() req,
	): Promise<PostResponseDto> {
		if (!req.user) {
			throw new UnauthorizedException();
		}
		const limitValue = limit ? parseInt(limit) : 10;
		const skipValue = skip ? parseInt(skip) : 0;
		return this.postService.getUserPost(accountname, limitValue, skipValue);
	}

	@Get(':post_id')
	@UseGuards(JwtAuthGuard)
	async getPostDetail(
		@Param('post_id') postId: string,
		@Req() req,
	): Promise<PostSingleResponseDto> {
		if (!req.user) {
			throw new UnauthorizedException();
		}
		return this.postService.getPostDetail(postId);
	}

	@Post('/')
	@UseGuards(JwtAuthGuard)
	async createPost(
		@Body() post: PostRequestDto,
		@Req() req,
	): Promise<PostSingleResponseDto> {
		if (!req.user) {
			throw new UnauthorizedException();
		}
		return this.postService.createPost(req.user._id, post.post);
	}

	@Put(':post_id')
	@UseGuards(JwtAuthGuard)
	async updatePost(
		@Param('post_id') postId: string,
		@Body() post: PostRequestDto,
		@Req() req,
	): Promise<PostSingleResponseDto> {
		if (!req.user) {
			throw new UnauthorizedException();
		}
		return this.postService.updatePost(postId, req.user._id, post.post);
	}

	@Delete(':post_id')
	@UseGuards(JwtAuthGuard)
	async deletePost(
		@Param('post_id') postId: string,
		@Req() req,
	): Promise<{ message: string }> {
		if (!req.user) {
			throw new UnauthorizedException();
		}
		return this.postService.deletePost(postId, req.user._id);
	}
}
