import data from '../data/feedback.json';

import { Entry, EntryDetailed } from '../types';

import { parseEntries, parseEntryDetailed } from '../utils/toEntry';

const getAll = (): Entry[] => {
	return parseEntries(data);
};

const getSingle = (id: number): EntryDetailed => {
	const entry = data.find(entry => entry.id === id);
	return parseEntryDetailed(entry);
};

export default { getAll, getSingle };
