import { ProfileResponse } from '@user/dto/user-base.dto';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostRequest {
	@IsString()
	@IsNotEmpty({ message: '게시글 내용을 입력해주세요' })
	content: string;

	@IsString()
	image: string;
}

export class PostResponse {
	@IsString()
	content: string;

	@IsString()
	image: string;

	@IsString()
	createdAt: string;

	@IsString()
	updatedAt: string;

	@IsBoolean()
	hearted: boolean;

	@IsNumber()
	heartCount: number;

	@IsNumber()
	commentCount: number;

	@Type(() => ProfileResponse)
	author: ProfileResponse;
}

export class PostReportResponse {
	post: string;
}
