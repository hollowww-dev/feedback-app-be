import { isString, isNumber } from './utils';

import { Entry, Category, Status, Comment, Reply, User } from '../types';

const parseId = (id: unknown): number => {
	if (!id || !isNumber(id)) {
		throw new Error('Incorrect or missing ID');
	}

	return id;
};

const parseTitle = (title: unknown): string => {
	if (!title || !isString(title)) {
		throw new Error('Incorrect or missing title');
	}

	return title;
};

const isCategory = (param: string): param is Category => {
	return Object.values(Category)
		.map(v => v.toString())
		.includes(param);
};

const parseCategory = (category: unknown): Category => {
	if (!category || !isString(category) || !isCategory(category)) {
		{
			throw new Error('Incorrect or missing category');
		}
	}

	return category;
};

const parseUpvotes = (upvotes: unknown): number => {
	if (!upvotes || !isNumber(upvotes)) {
		throw new Error('Incorrect or missing upvotes');
	}

	return upvotes;
};

const isStatus = (param: string): param is Status => {
	return Object.values(Status)
		.map(v => v.toString())
		.includes(param);
};

const parseStatus = (status: unknown): Status => {
	if (!status || !isString(status) || !isStatus(status)) {
		throw new Error('Incorrect or missing status');
	}

	return status;
};

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description');
	}

	return description;
};

const parseContent = (content: unknown): string => {
	if (!content || !isString(content)) {
		throw new Error('Incorrect or missing comment content');
	}

	return content;
};

const parseUser = (user: unknown): User => {
	if (!user || typeof user !== 'object') {
		throw new Error('Incorrect or missing user');
	}
	if (!('name' in user) || !isString(user.name)) {
		throw new Error('Incorrect or missing users name');
	}
	if (!('username' in user) || !isString(user.username)) {
		throw new Error('Incorrect or missing users username');
	}

	return {
		name: user.name,
		username: user.username,
	};
};

const parseReplyingto = (replyingTo: unknown): string => {
	if (!replyingTo || !isString(replyingTo)) {
		throw new Error('Incorrect or missing replying-to');
	}

	return replyingTo;
};

const parseReply = (reply: unknown): Reply => {
	if (!reply || typeof reply !== 'object') {
		throw new Error('Incorrect or missing reply');
	}
	if (!('content' in reply) || !('replyingTo' in reply) || !('user' in reply)) {
		throw new Error('Some fields are missing');
	}
	return {
		content: parseContent(reply.content),
		replyingTo: parseReplyingto(reply.replyingTo),
		user: parseUser(reply.user),
	};
};

const parseReplies = (replies: unknown): Reply[] => {
	if (!replies || !(replies instanceof Array)) {
		throw new Error('Incorrect or missing replies');
	}

	return replies.map((reply: Reply) => parseReply(reply));
};

const parseComment = (comment: unknown): Comment => {
	if (!comment || typeof comment !== 'object') {
		throw new Error('Incorrect or missing comment');
	}
	if (!('id' in comment) || !('content' in comment) || !('user' in comment)) {
		throw new Error('Some fields are missing');
	}
	const parsedComment: Comment = {
		id: parseId(comment.id),
		content: parseContent(comment.content),
		user: parseUser(comment.user),
	};

	if ('replies' in comment) {
		parsedComment.replies = parseReplies(comment.replies);
	}

	return parsedComment;
};

const parseComments = (comments: unknown): Comment[] => {
	if (!comments || !(comments instanceof Array)) {
		throw new Error('Incorrect or missing comments');
	}

	return comments.map((comment: Comment) => parseComment(comment));
};

export const parseEntry = (entry: unknown): Entry => {
	if (!entry || typeof entry !== 'object') {
		throw new Error('Incorrect or missing entry');
	}

	if (
		!('id' in entry) ||
		!('title' in entry) ||
		!('category' in entry) ||
		!('upvotes' in entry) ||
		!('status' in entry) ||
		!('description' in entry)
	) {
		throw new Error('Some fields are missing');
	}

	const parsedEntry: Entry = {
		id: parseId(entry.id),
		title: parseTitle(entry.title),
		category: parseCategory(entry.category),
		upvotes: parseUpvotes(entry.upvotes),
		status: parseStatus(entry.status),
		description: parseDescription(entry.description),
	};

	if ('comments' in entry) {
		parsedEntry.comments = parseComments(entry.comments);
	}

	return parsedEntry;
};

export const parseEntries = (entries: unknown): Entry[] => {
	if (!entries || !(entries instanceof Array)) {
		throw new Error('Incorrect or missing entries');
	}

	return entries.map((entry: Entry) => parseEntry(entry));
};
