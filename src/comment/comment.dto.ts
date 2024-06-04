import { UserOtherProfileRes } from '@user/user.dto';

export interface CommentDTO {
	readonly id: string;
	content: string;
	createdAt: string;
	author: UserOtherProfileRes;
}
