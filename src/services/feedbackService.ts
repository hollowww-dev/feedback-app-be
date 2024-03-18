import feedbackModel from '../models/feedback';
import { NewEntry, Status, EntryDetailed, EntryDetailedWoutId, Entry } from '../types';
import { parseEntries, parseEntryDetailed } from '../utils/toEntry';

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
