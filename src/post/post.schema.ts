import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
	@Prop({ type: String })
	content: string;

	@Prop({ type: String, trim: true })
	image: string;

	@Prop({ type: Date, default: Date.now })
	createdAt: Date;

	@Prop({ type: Date, default: Date.now })
	updatedAt: Date;

	@Prop({ type: [String], default: [] })
	comment: string[];

	@Prop({ type: String, required: true })
	authorId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
