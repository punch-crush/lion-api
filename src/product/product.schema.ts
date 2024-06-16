import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
	@Prop({ type: String, required: true, trim: true })
	itemName: string;

	@Prop({ type: Number, required: true })
	price: number;

	@Prop({ type: String, required: true, trim: true })
	link: string;

	@Prop({ type: String, required: true, trim: true })
	itemImage: string;

	@Prop({ type: String, required: true })
	author: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
