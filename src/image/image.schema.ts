import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
	@Prop({ type: String, trim: true, required: true })
	fieldname: string;

	@Prop({ type: String, trim: true, required: true })
	originalname: string;

	@Prop({ type: String, trim: true, required: true })
	encoding: string;

	@Prop({ type: String, trim: true, required: true })
	mimetype: string;

	@Prop({ type: String, trim: true, required: true })
	destination: string;

	@Prop({
		type: String,
		trim: true,
		required: true,
		match: /\.(jpg|gif|png|jpeg|bmp|tif|heic)$/,
	})
	filename: string;

	@Prop({ type: String, trim: true, required: true })
	path: string;

	@Prop({ type: Number, required: true })
	size: number;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
