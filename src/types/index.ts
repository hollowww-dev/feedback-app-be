import { Types } from 'mongoose';

export enum Category {
	'UI' = 'ui',
	'UX' = 'ux',
	'Enhancement' = 'enhancement',
	'Bug' = 'bug',
	'Feature' = 'feature',
}

export enum Status {
	'Suggestion' = 'suggestion',
	'Planned' = 'planned',
	'In-Progress' = 'inprogress',
	'Live' = 'live',
}

export interface Entry {
	id: string;
	title: string;
	category: Category;
	upvotes: number;
	status: Status;
	description: string;
	comments?: number;
}

export type NewEntry = Omit<Entry, 'id' | 'comments' | 'status' | 'upvotes'>;

export type User = {
	name: string;
	username: string;
	passwordHash: string;
	upvoted: string[];
};

export type Author = Omit<User, 'passwordHash' | 'upvoted'>;

export type NewUser = Omit<User, 'passwordHash' | 'upvoted'> & {
	password: string;
};

export type LoggedUser = {
	token: string;
	user: Omit<User, 'passwordHash'>;
};

export type LoggedUserWoutToken = Omit<LoggedUser, 'token'>;

export type UserForToken = {
	username: string;
	id: Types.ObjectId;
};

export type Credentials = {
	username: string;
	password: string;
};

export type Reply = {
	id: string;
	content: string;
	user: Author;
};

export type Comment = {
	id: string;
	content: string;
	user: Author;
	replies?: Reply[];
};

export type EntryDetailed = Omit<Entry, 'comments'> & { comments?: Comment[] };
export type EntryDetailedWoutId = Omit<EntryDetailed, 'id'>;
