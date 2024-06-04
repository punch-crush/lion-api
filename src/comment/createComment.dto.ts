import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDTO {
	@IsString()
	@IsNotEmpty({ message: '댓글을 입력해주세요' })
	content: string;
}
