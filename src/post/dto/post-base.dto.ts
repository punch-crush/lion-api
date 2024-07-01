import { ProfileResponse } from '@user/dto/user-base.dto';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class PostRequest {
	@IsString()
	content: string;

	@IsString()
	image: string;
}

export class PostResponse extends PostRequest {
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
