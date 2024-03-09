import express from 'express';
const feedbackRouter = express.Router();

import feedbackService from '../services/feedbackService';

feedbackRouter.get('/', (_req, res) => {
	const feedback = feedbackService.getAll();
	res.send(feedback);
});

feedbackRouter.get('/:id', (req, res) => {
	const feedbackEntry = feedbackService.getSingle(Number(req.params.id));
	if (feedbackEntry) {
		return res.send(feedbackEntry);
	} else {
		return res.status(404);
	}
});

export default feedbackRouter;
