import { Credentials } from '../types';
import { isString } from './utils';

const parseUsername = (username: unknown): string => {
	if (!username || !isString(username)) {
		throw new Error('Missing or invalid username');
	}

	return username;
};

const parsePassword = (password: unknown): string => {
	if (!password || !isString(password)) {
		throw new Error('Missing or invalid password');
	}

	return password;
};

export const toCredentials = (credentials: unknown): Credentials => {
	if (!credentials || typeof credentials !== 'object') {
		throw new Error('Incorrect or missing credentials');
	}

	if (!('username' in credentials) || !('password' in credentials)) {
		throw new Error('Some fields are missing');
	}

	const parsedCredentials = {
		username: parseUsername(credentials.username),
		password: parsePassword(credentials.password),
	};

	return parsedCredentials;
};
