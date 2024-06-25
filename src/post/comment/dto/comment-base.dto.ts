import { ProfileResponse } from '@user/dto/user-base.dto';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CommentRequest {
	@IsString()
	@IsNotEmpty({ message: '댓글을 입력해주세요' })
	content: string;
}

export class CommentResponse {
	@IsString()
	@IsNotEmpty({ message: '댓글을 입력해주세요' })
	content: string;

	@IsDate()
	createdAt: string;

	@Type(() => ProfileResponse)
	author: ProfileResponse;
}

export class CommentReportResponse {
	comment: string;
}
