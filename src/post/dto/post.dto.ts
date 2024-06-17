import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PostReportResponse, PostRequest, PostResponse } from './post-base.dto';

export class PostRequestDto {
	@ValidateNested()
	@Type(() => PostRequest)
	post: PostRequest;
}

export class PostSingleResponseDto {
	@ValidateNested()
	@Type(() => PostResponse)
	post: PostResponse;
}

export class PostResponseDto {
	@ValidateNested()
	@Type(() => PostResponse)
	post: PostResponse[];
}

export class PostListResponseDto {
	@ValidateNested()
	@Type(() => PostResponse)
	posts: PostResponse[];
}

export class PostReportResponseDto {
	@ValidateNested()
	@Type(() => PostReportResponse)
	report: PostReportResponse;
}
