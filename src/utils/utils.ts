export const isString = (param: unknown): param is string => {
	return typeof param === 'string' || param instanceof String;
};

export const isNumber = (param: unknown): param is number => {
	return typeof param === 'number' || param instanceof Number;
};
