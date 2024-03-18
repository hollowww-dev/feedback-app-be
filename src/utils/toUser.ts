import { NewUser } from '../types';
import { isString } from './utils';

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name');
	}

	return name;
};

const parseUsername = (username: unknown): string => {
	if (!username || !isString(username)) {
		throw new Error('Incorrect or missing username');
	}

	return username;
};

const parsePassword = (password: unknown): string => {
	if (!password || !isString(password)) {
		throw new Error('Incorrect or missing password');
	} else if (password.length < 3) {
		throw new Error('Password needs to be at least 3 characters long');
	}

	return password;
};

export const toNewUser = (user: unknown): NewUser => {
	if (!user || typeof user !== 'object') {
		throw new Error('Incorrect or missing user');
	}

	if (!('name' in user) || !('username' in user) || !('password' in user)) {
		throw new Error('Some fields are missing');
	}

	const parsedUser: NewUser = {
		name: parseName(user.name),
		username: parseUsername(user.username),
		password: parsePassword(user.password),
	};

	return parsedUser;
};
