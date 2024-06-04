import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
	fieldname: { type: String, trim: true, required: true },
	originalname: { type: String, trim: true, required: true },
	encoding: { type: String, trim: true, required: true },
	mimetype: { type: String, trim: true, required: true },
	destination: { type: String, trim: true, required: true },
	filename: {
		type: String,
		trim: true,
		required: true,
		match: /\.(jpg|gif|png|jpeg|bmp|tif|heic)$/,
	},
	path: { type: String, trim: true, required: true },
	size: { type: Number, required: true },
});

export default mongoose.model('Image', imageSchema);
