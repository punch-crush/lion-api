import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { SingleComment } from './dto/createComment.dto';

@Schema({ timestamps: true, collection: 'comments' })
export class Comment extends Document {
	@Prop({ type: String, required: true })
	postId: string;

	@Prop({
		type: [
			{
				content: String,
				createdAt: { type: Date, default: () => Date.now() },
				authorId: String,
				_id: { type: String, default: () => new mongoose.Types.ObjectId() },
			},
		],
		default: [],
	})
	comments: SingleComment[];
}

export type CommentDocument = HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
