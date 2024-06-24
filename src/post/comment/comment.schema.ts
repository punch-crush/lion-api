import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'comments' })
export class Comment extends Document {
	@Prop({ type: String, required: true })
	postId: string;

	@Prop({ type: String, required: true })
	content: string;

	@Prop({ type: Date, default: Date.now })
	createdAt: Date;

	@Prop({ type: String, required: true })
	authorId: string;

	readonly readOnlyData: {
		_id: string;
		content: string;
		createdAt: string;
	};
}

export type CommentDocument = HydratedDocument<Comment>;

const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.virtual('readOnlyData').get(function (this: Comment) {
	return {
		id: this._id,
		content: this.content,
		createdAt: this.createdAt.toISOString(),
	};
});

export default CommentSchema;
