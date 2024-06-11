import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comment extends Document {
	@Prop({ type: String, required: true })
	content: string;

	@Prop({ type: Date, default: () => Date.now() })
	createdAt: Date;

	@Prop({ type: String, required: true })
	authorId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
