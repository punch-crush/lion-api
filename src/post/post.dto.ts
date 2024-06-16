export interface PostDTO {
	readonly _id: string;
	content: string;
	image: string;
	createdAt: string;
	updatedAt: string;
	hearted: boolean;
	heartCount: number;
	commentCount: number;
	authorId: string;
}
