import { UserOtherProfileRes } from '@user/user.dto';

export interface PostDTO {
	readonly _id: string;
	content: string;
	image: string;
	createdAt: string;
	updatedAt: string;
	hearted: boolean;
	heartCount: number;
	commentCount: number;
	author: UserOtherProfileRes;
}
