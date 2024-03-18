import { NewUser, User } from '../types';

import userModel from '../models/user';
import bcrypt from 'bcrypt';

export const addUser = async (user: NewUser): Promise<User> => {
	const passwordHash = await bcrypt.hash(user.password, 10);

	const newUser = new userModel<User>({
		name: user.name,
		username: user.username,
		passwordHash,
		upvoted: [],
	});

	const savedUser = await newUser.save();

	return savedUser;
};
