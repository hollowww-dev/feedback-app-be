import express from 'express';

import feedbackRouter from './routes/feedbackRouter';

import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here :)');
	res.send('pong');
});

app.use('/api/feedback', feedbackRouter);

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
