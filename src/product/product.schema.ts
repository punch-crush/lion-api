import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

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

	@Prop({ type: String, required: true })
	author: string;

	readonly readOnlyData: {
		_id: string;
		itemName: string;
		price: number;
		link: string;
		itemImage: string;
	};
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.virtual('readOnlyData').get(function (this: Product) {
	return {
		_id: this._id,
		itemName: this.itemName,
		price: this.price,
		link: this.link,
		itemImage: this.itemImage,
	};
});
