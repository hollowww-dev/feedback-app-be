export {};

declare global {
	module Express {
		interface Request {
			token?: string;
		}
	}
}
