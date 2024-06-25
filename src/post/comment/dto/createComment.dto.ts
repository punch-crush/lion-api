import { ProfileResponse } from '@user/dto/user-base.dto';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateCommentRequest {
	@IsString()
	@IsNotEmpty({ message: '댓글을 입력해주세요' })
	content: string;
}

export class CreateCommentResponse extends CreateCommentRequest {
	@IsString()
	id: string;

	@IsDate()
	createdAt: Date;

	@Type(() => ProfileResponse)
	author: ProfileResponse;
}

export class SingleComment extends CreateCommentRequest {
	@IsDate()
	createdAt: Date;

	@IsString()
	authorId: string;

	@IsString()
	_id?: string;
}
