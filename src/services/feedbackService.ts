import feedbackModel from '../models/feedback';
import userModel from '../models/user';
import { NewEntry, Status, EntryDetailed, EntryDetailedWoutId, Entry } from '../types';
import { parseEntries, parseEntry, parseEntryDetailed } from '../utils/toEntry';

export const getAll = async (): Promise<Entry[]> => {
	const entries = await feedbackModel.find({});
	const parsedEntries = parseEntries(entries);

	return parsedEntries;
};

export const getSingle = async (id: string): Promise<EntryDetailed> => {
	const entry = await feedbackModel.findOne({ _id: id });
	const parsedEntry = parseEntryDetailed(entry);

	return parsedEntry;
};

export const addFeedback = async (feedback: NewEntry): Promise<EntryDetailed> => {
	const newFeedback = new feedbackModel<EntryDetailedWoutId>({
		status: Status.Suggestion,
		upvotes: 0,
		comments: [],
		...feedback,
	});

	const savedFeedback = await newFeedback.save();

	return savedFeedback;
};

export const upvote = async (entryId: Entry['id'], userId: string): Promise<Entry> => {
	const entry = await feedbackModel.findOne({ _id: entryId });

	if (!entry) {
		throw new Error('Entry not found');
	}

	const user = await userModel.findOne({ _id: userId });

	if (!user) {
		throw new Error('User not found');
	}

	if (!user.upvoted.includes(entry.id)) {
		entry.upvotes++;
		user.upvoted = [...user.upvoted, entry.id];
	} else {
		entry.upvotes--;
		user.upvoted = user.upvoted.filter(id => id !== entry.id);
	}

	await entry.save();
	await user.save();

	const parsedEntry = parseEntry(entry);
	return parsedEntry;
};
