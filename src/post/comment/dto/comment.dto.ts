import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import {
	CommentReportResponse,
	CommentRequest,
	CommentResponse,
} from './comment-base.dto';

export class CommentRequestDto {
	@ValidateNested()
	@Type(() => CommentRequest)
	comment: CommentRequest;
}

export class CommentResponseDto {
	@ValidateNested()
	@Type(() => CommentResponse)
	comments: CommentResponse;
}

export class CommentListResponseDto {
	@ValidateNested()
	@Type(() => CommentResponse)
	comments: CommentResponse[];
}

export class CommentReportResponseDto {
	@ValidateNested()
	@Type(() => CommentReportResponse)
	report: CommentReportResponse;
}
