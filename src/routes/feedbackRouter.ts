import express from 'express';
const feedbackRouter = express.Router();

import { Types } from 'mongoose';

import { toNewEntry } from '../utils/toEntry';
import { getAll, getSingle, addFeedback } from '../services/feedbackService';

feedbackRouter.get('/', async (_req, res) => {
	try {
		const entries = await getAll();
		return res.json(entries);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.status(400).send(errorMessage);
	}
});

feedbackRouter.get('/:id', async (req, res) => {
	const id = req.params.id;
	if (!Types.ObjectId.isValid(id)) {
		return res.status(400).send('Invalid feedback ID');
	}
	try {
		const entry = await getSingle(id);
		return res.json(entry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.status(500).send(errorMessage);
	}
});

feedbackRouter.post('/', async (req, res) => {
	try {
		const newFeedback = toNewEntry(req.body);
		const savedFeedback = await addFeedback(newFeedback);
		return res.json(savedFeedback);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.status(400).send(errorMessage);
	}
});

export default feedbackRouter;
