import express from 'express';
const usersRouter = express.Router();

import { toNewUser } from '../utils/toUser';
import { addUser } from '../services/usersService';

usersRouter.post('/', async (req, res) => {
	try {
		const newUser = toNewUser(req.body);
		const addedUser = await addUser(newUser);
		return res.json(addedUser);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.status(400).send(errorMessage);
	}
});

export default usersRouter;
