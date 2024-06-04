import mongoose from 'mongoose';
import { User } from '../user/user.schema';

const postSchema = new mongoose.Schema({
	content: { type: String },
	image: { type: String, trim: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	hearted: { type: Array, default: [] },
	comment: { type: Array, default: [] },
	author: { type: User, required: true },
});

export default mongoose.model('Post', postSchema);
