import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
	PostListResponseDto,
	PostReportResponseDto,
	PostRequestDto,
	PostResponseDto,
	PostSingleResponseDto,
} from './dto/post.dto';
import { JwtAuthGuard } from '@user/auth/guards/jwt-auth.guard';
import { CommentService } from './comment/comment.service';
import { CommentRequestDto } from './comment/dto/comment.dto';
import { HandleErrors } from 'src/util/error-decorator';

@Controller()
export class PostController {
	constructor(
		private readonly postService: PostService,
		private readonly commentService: CommentService,
	) {}

	@Get('/')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getAllPost(
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@Req() req,
	): Promise<PostListResponseDto> {
		try {
			const limitValue = limit ? parseInt(limit) : 10;
			const skipValue = skip ? parseInt(skip) : 0;
			return this.postService.getAllPost(req.user._id, limitValue, skipValue);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Get('/feed')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getFeedPost(
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@Req() req,
	): Promise<PostListResponseDto> {
		try {
			const limitValue = limit ? parseInt(limit) : 10;
			const skipValue = skip ? parseInt(skip) : 0;
			return this.postService.getFeedPost(req.user._id, limitValue, skipValue);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Get(':accountname/userpost')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getUserPost(
		@Param('accountname') accountname: string,
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@Req() req,
	): Promise<PostResponseDto> {
		try {
			const limitValue = limit ? parseInt(limit) : 10;
			const skipValue = skip ? parseInt(skip) : 0;
			return this.postService.getUserPost(
				req.user._id,
				accountname,
				limitValue,
				skipValue,
			);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Get(':post_id')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getPostDetail(
		@Param('post_id') postId: string,
		@Req() req,
	): Promise<PostSingleResponseDto> {
		try {
			return this.postService.getPostDetail(req.user._id, postId);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Post('/')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async createPost(
		@Body() post: PostRequestDto,
		@Req() req,
	): Promise<PostSingleResponseDto> {
		try {
			return this.postService.createPost(req.user._id, post.post);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Put(':post_id')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async updatePost(
		@Param('post_id') postId: string,
		@Body() post: PostRequestDto,
		@Req() req,
	): Promise<PostSingleResponseDto> {
		try {
			return this.postService.updatePost(postId, req.user._id, post.post);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Delete(':post_id')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async deletePost(
		@Param('post_id') postId: string,
		@Req() req,
	): Promise<{ message: string }> {
		try {
			return this.postService.deletePost(postId, req.user._id);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Post(':post_id/report')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async reportPost(@Param('post_id') postId: string): Promise<PostReportResponseDto> {
		try {
			return this.postService.reportPost(postId);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Post(':post_id/comments')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async createComment(
		@Param('post_id') postId: string,
		@Body() comment: CommentRequestDto,
		@Req() req,
	) {
		this.postService.getPostById(postId);
		return this.commentService.createComment(postId, comment.comment, req.user._id);
	}

	@Get(':post_id/comments')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async getCommentList(
		@Param('post_id') postId: string,
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@Req() req,
	) {
		const limitValue = limit ? parseInt(limit) : 10;
		const skipValue = skip ? parseInt(skip) : 0;
		this.postService.getPostById(postId);
		return this.commentService.getCommentList(
			postId,
			req.user._id,
			limitValue,
			skipValue,
		);
	}

	// @Delete(':post_id/comments/:comment_id')
	// async deleteComment(
	// 	@Param('post_id') postId: string,
	// 	@Param('comment_id') commentId: string,
	// ) {
	// 	try {
	// 		return this.commentService.deleteComment(postId, commentId, req.user._id);
	// 	} catch (error) {
	// 		if (error instanceof HttpException) {
	// 			throw error;
	// 		} else {
	// 			throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
	// 		}
	// 	}
	// }
}
