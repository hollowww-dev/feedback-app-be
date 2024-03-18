import express from 'express';

import feedbackRouter from './routes/feedbackRouter';
import usersRouter from './routes/usersRouter';
import loginRouter from './routes/loginRouter';

import cors from 'cors';

import mongoose from 'mongoose';

import config from './utils/config';

const app = express();

try {
	if (!config.MONGODB_URL) {
		throw new Error('MongoDB URL is not defined');
	}
	mongoose.connect(config.MONGODB_URL).then(() => {
		console.log(`connected to DB`);
	});
} catch (error) {
	console.log(error);
	process.exit(1);
}

app.use(cors());

app.use(express.json());

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here :)');
	res.send('pong');
});

app.use('/api/feedback', feedbackRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

export default app;
