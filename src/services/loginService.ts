import { Credentials, LoggedUser, LoggedUserWoutToken, UserForToken } from '../types';

import userModel from '../models/user';

import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import config from '../utils/config';

export const authenticate = async (credentials: Credentials): Promise<LoggedUser> => {
	const user = await userModel.findOne({ username: credentials.username });
	const passwordCorrect =
		user === null ? false : await bcrypt.compare(credentials.password, user.passwordHash);

	if (!user) {
		throw new Error('Invalid username');
	}

	if (!passwordCorrect) {
		throw new Error('Invalid password');
	}

	if (!config.SECRET) {
		throw new Error('Secret password is not declared');
	}

	const userForToken: UserForToken = {
		username: user.username,
		id: user._id,
	};

	const token: string = jsonwebtoken.sign(userForToken, config.SECRET);

	return {
		token,
		user: {
			username: user.username,
			name: user.name,
			upvoted: user.upvoted,
		},
	};
};

export const getUser = async (token: LoggedUser['token']): Promise<LoggedUserWoutToken> => {
	if (!config.SECRET) {
		throw new Error('Secret password is not declared');
	}

	const decodedToken = jsonwebtoken.verify(token, config.SECRET) as UserForToken;

	const user = await userModel.findOne({ _id: decodedToken.id });

	if (!user) {
		throw new Error('Couldnt find a user');
	}

	if (!user.username || !user.name || !user.upvoted) {
		throw new Error('Some fields are missing');
	}

	return { user };
};
