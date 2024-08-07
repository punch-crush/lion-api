import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class User extends Document {
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

	@Prop({ type: String, trim: true })
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

	readonly registerData: {
		_id: string;
		username: string;
		email: string;
		accountname: string;
		intro: string;
		image: string;
	};

	readonly readOnlyData: {
		_id: string;
		email: string;
		username: string;
		accountname: string;
		intro: string;
		image: string;
		following: string[];
		follower: string[];
		followingCount: number;
		followerCount: number;
		isfollow: boolean;
	};
}

export type UserDocument = HydratedDocument<User>;
const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('registerData').get(function (this: User) {
	return {
		_id: this.id,
		email: this.email,
		username: this.username,
		accountname: this.accountname,
		intro: this.intro,
		image: this.image,
	};
});

UserSchema.virtual('readOnlyData').get(function (this: User) {
	return {
		_id: this.id,
		username: this.username,
		accountname: this.accountname,
		intro: this.intro,
		image: this.image,
		isfollow: false,
		following: this.following,
		follower: this.follower,
		followingCount: this.following.length,
		followerCount: this.follower.length,
	};
});

export default UserSchema;
