import express from 'express';
const feedbackRouter = express.Router();

import { toNewEntry } from '../utils/toEntry';
import { getAll, getSingle, addFeedback } from '../services/feedbackService';

feedbackRouter.get('/', async (_req, res) => {
	try {
		const entries = await getAll();
		res.json(entries);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

feedbackRouter.get('/:id', async (req, res) => {
	try {
		const entry = await getSingle(req.params.id);
		res.json(entry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

feedbackRouter.post('/', async (req, res) => {
	try {
		const newFeedback = toNewEntry(req.body);
		const savedFeedback = await addFeedback(newFeedback);
		res.json(savedFeedback);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default feedbackRouter;
