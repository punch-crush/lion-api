import mongoose from 'mongoose';
import userSchema from '../user/user.schema';

const commentSchema = new mongoose.Schema({
	content: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	author: { type: userSchema, required: true },
});

export default mongoose.model('Comment', commentSchema);
