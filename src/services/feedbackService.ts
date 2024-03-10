import data from '../data/feedback.json';

import { Entry } from '../types';

import { parseEntry, parseEntries } from '../utils/toEntry';

const getAll = (): Entry[] => {
	return parseEntries(data);
};

const getSingle = (id: number): Entry => {
	const entry = data.find(entry => entry.id === id);
	return parseEntry(entry);
};

export default { getAll, getSingle };
