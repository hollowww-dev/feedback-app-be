import mongoose from 'mongoose';
import { EntryDetailed } from '../types';

const feedbackSchema = new mongoose.Schema<EntryDetailed>({
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	category: {
		type: String,
		required: [true, 'Category is required'],
	},
	upvotes: {
		type: Number,
		required: [true, 'Upvotes is required'],
	},
	status: {
		type: String,
		required: [true, 'Status is required'],
	},
	description: {
		type: String,
		required: [true, 'Status is required'],
	},
	comments: [
		{
			id: String,
			content: { type: String, required: [true, 'Comment content is required'] },
			user: {
				name: { type: String, required: [true, 'Comment name is required'] },
				username: { type: String, required: [true, 'Comment username is required'] },
			},
			replies: [
				{
					id: String,
					content: { type: String, required: [true, 'Reply content is required'] },
					user: {
						name: { type: String, required: [true, 'Comment name is required'] },
						username: { type: String, required: [true, 'Comment username is required'] },
					},
				},
			],
		},
	],
});

feedbackSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const feedbackModel = mongoose.model<EntryDetailed>('Feedback', feedbackSchema);

export default feedbackModel;
