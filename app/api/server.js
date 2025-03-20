import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import { sequelize } from './db/db.js';
import './db/sync.js';

import apiRouter from './routes/index.js';
import { handleErrors } from './middlewares/handleErrors.js';
import controllerWrapper from './decorators/controllerWrapper.js';

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const basePath = path.join(process.cwd(), '..', 'httpdocs');

app.use(morgan('dev'));
app.use(cors());
app.use(express.static(basePath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve React's index.html for any unknown routes
app.get('/', (req, res) => res.redirect('/index.html'));

app.use('/api', controllerWrapper(apiRouter));

app.use(handleErrors);
app.use((_, res) => res.status(404).send('Not found'));

const preparationJobs = [];
preparationJobs.push(
    new Promise((resolve, reject) => {
        sequelize
            .authenticate()
            .then(() => resolve('Database connected successfully.'))
            .catch((err) => reject('Unable to connect to the database: ' + err.message));
    })
);

// preparationJobs.push(
//     new Promise((resolve, reject) => {
//         verifyDirectories()
//             .then(() => resolve('Directories verified successfully.'))
//             .catch((err) => reject('Unable to verify working directories: ' + err.message));
//     })
// );

await Promise.all(preparationJobs)
    .then((res) =>
        res.forEach((message) => {
            console.info(message);
        })
    )
    .catch((error) => {
        console.error(error);
        console.info('Server cannot start - exiting...');
        process.exit(1);
    });

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
