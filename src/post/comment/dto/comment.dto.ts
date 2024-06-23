import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateCommentRequest, CreateCommentResponse } from './createComment.dto';

export class CommentRequestDto {
	@ValidateNested()
	@Type(() => CreateCommentRequest)
	comment: CreateCommentRequest;
}

export class CommentResponseDto {
	@ValidateNested()
	@Type(() => CreateCommentResponse)
	comment: CreateCommentResponse;
}

export class CommentListResponseDto {
	@ValidateNested()
	@Type(() => CreateCommentResponse)
	comment: CreateCommentResponse[];
}

// export interface CommentDTO {
// 	readonly id: string;
// 	content: string;
// 	createdAt: string;
// 	authorId: string;
// }
