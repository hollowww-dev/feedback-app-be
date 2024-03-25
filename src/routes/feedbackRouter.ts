import express from 'express';
const feedbackRouter = express.Router();

import { Types } from 'mongoose';

import { toNewEntry } from '../utils/toEntry';
import { getAll, getSingle, addFeedback, upvote } from '../services/feedbackService';
import middleware from '../utils/middleware';
import jsonwebtoken from 'jsonwebtoken';
import config from '../utils/config';
import { UserForToken } from '../types';

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

feedbackRouter.post('/:id/vote', middleware.tokenExtractor, async (req, res) => {
	if (!req.token) {
		return res.status(401).send('Invalid token');
	}
	const { id } = req.params;

	if (!config.SECRET) {
		throw new Error('Secret password is not declared');
	}

	const decodedToken = jsonwebtoken.verify(req.token, config.SECRET) as UserForToken;
	try {
		const entry = await upvote(id, decodedToken.id);
		return res.json(entry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.status(400).send(errorMessage);
	}
});

export default feedbackRouter;
