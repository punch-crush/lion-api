import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { KeyObject } from 'crypto';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
	@Prop({ type: KeyObject })
	_id: KeyObject;

	@Prop({
		type: String,
		required: true,
		unique: true,
		trim: true,
		match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	})
	email: string;

	@Prop({ type: String, required: true, trim: true, minlength: 6 })
	password: string;

	@Prop({ type: String, required: true, trim: true })
	token: string;

	@Prop({ type: String, required: true, unique: true, trim: true })
	username: string;

	@Prop({
		type: String,
		required: true,
		unique: true,
		trim: true,
		match: /^[a-zA-Z0-9_.]+$/,
	})
	accountname: string;

	@Prop({ type: String, trim: true })
	intro: string;

	@Prop({ type: String, trim: true, default: '' })
	image: string;

	@Prop({ type: [String], default: [] })
	following: string[];

	@Prop({ type: [String], default: [] })
	follower: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
