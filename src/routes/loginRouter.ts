import express from 'express';
const loginRouter = express.Router();

import { toCredentials } from '../utils/toCredentials';
import { login } from '../services/loginService';

loginRouter.post('/', async (req, res) => {
	try {
		const credentials = toCredentials(req.body);
		const loggedUser = await login(credentials);
		res.json(loggedUser);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default loginRouter;
