import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
	@Prop({ type: String, trim: true, required: true })
	filename: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
