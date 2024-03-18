import { Credentials, LoggedUser } from '../types';

import userModel from '../models/user';

import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import config from '../utils/config';

export const login = async (credentials: Credentials): Promise<LoggedUser> => {
	const user = await userModel.findOne({ username: credentials.username });
	const passwordCorrect =
		user === null ? false : await bcrypt.compare(credentials.password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		throw new Error('Invalid username or password');
	}

	if (!config.SECRET) {
		throw new Error('Secret password is not declared');
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token: string = jsonwebtoken.sign(userForToken, config.SECRET);

	return {
		token,
		username: user.username,
		name: user.name,
		upvoted: user.upvoted,
	};
};
