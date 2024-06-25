import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'post' })
export class Post extends Document {
	@Prop({ type: String })
	content: string;

	@Prop({ type: String, trim: true })
	image: string;

	@Prop({ type: Date, default: Date.now })
	createdAt: Date;

	@Prop({ type: Date, default: Date.now })
	updatedAt: Date;

	@Prop({ type: Number, default: 0 })
	commentCount: number;

	@Prop({ type: [String], default: [] })
	heart: string[];

	@Prop({ type: String, required: true })
	author: string;

	readonly readOnlyData: {
		_id: string;
		content: string;
		image: string;
		createdAt: string;
		updatedAt: string;
		hearted: boolean;
		heartCount: number;
		commentCount: number;
	};
}

export type PostDocument = HydratedDocument<Post>;
const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.virtual('readOnlyData').get(function (this: Post) {
	return {
		id: this._id,
		content: this.content,
		image: this.image,
		createdAt: this.createdAt.toISOString(),
		updatedAt: this.updatedAt.toISOString(),
		hearted: false,
		heartCount: this.heart.length,
		commentCount: this.commentCount,
	};
});

export default PostSchema;
