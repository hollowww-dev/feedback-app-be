import express from 'express';
const loginRouter = express.Router();

import { toCredentials } from '../utils/toCredentials';
import { authenticate, getUser } from '../services/loginService';
import middleware from '../utils/middleware';

loginRouter.post('/', async (req, res) => {
	try {
		const credentials = toCredentials(req.body);
		const token = await authenticate(credentials);
		return res.json(token);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.status(400).send(errorMessage);
	}
});

loginRouter.post('/getuser', middleware.tokenExtractor, async (req, res) => {
	if (!req.token) {
		return res.status(401).send('Invalid token');
	}
	try {
		const loggedUser = await getUser(req.token);
		return res.json(loggedUser);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.status(400).send(errorMessage);
	}
});

export default loginRouter;
