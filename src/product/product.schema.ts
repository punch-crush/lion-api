import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

@Schema()
export class Product extends Document {
	@Prop({ type: String, required: true, trim: true })
	itemName: string;

	@Prop({ type: Number, required: true })
	price: number;

	@Prop({ type: String, required: true, trim: true })
	link: string;

	@Prop({ type: String, required: true, trim: true })
	itemImage: string;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	author: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ itemName: 'text' });
