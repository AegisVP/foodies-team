import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';

import apiRouter from './routes/index.js';
import { handleErrors } from './middlewares/handleErrors.js';

const app = express();
const SERVER_PORT = 3000;
const basePath = path.join(process.cwd(), '..', 'httpdocs');

console.log({ processPath: process.cwd(), basePath });

app.use(morgan('dev'));
app.use(cors());
app.use(express.static(basePath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve React's index.html for any unknown routes
app.get('/', (req, res) => res.redirect('/index.html'));

app.use('/api', apiRouter);

app.use(handleErrors);
app.use((_, res) => res.status(404).send('Not found'));

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
