import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import cors from 'cors';

import { sequelize } from './db/db.js';
import './db/sync.js';

import openapiRouter from './routes/openapiRouter.js';
import apiRouter from './routes/index.js';
import { handleErrors } from './middlewares/handleErrors.js';
import controllerWrapper from './decorators/controllerWrapper.js';

const app = express();
const SERVER_PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
const basePath = path.join(process.cwd(), '..', 'httpdocs');

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/avatars', express.static('public/avatars'));
app.use('/api-docs', controllerWrapper(openapiRouter));
app.use('/api', controllerWrapper(apiRouter));

// Webfront
app.use(express.static(basePath));
app.use('/*', (_, res) => res.sendFile(path.join(basePath, 'index.html')));

// Error handling and 404 fallback
app.use(handleErrors);
app.use((_, res) => res.header('Content-Type', 'text/html').status(404).send('Not found'));

const preparationJobs = [];
preparationJobs.push(
    new Promise((resolve, reject) => {
        sequelize
            .authenticate()
            .then(() => resolve('Database connected successfully.'))
            .catch(err => reject('Unable to connect to the database: ' + err.message));
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
    .then(res =>
        res.forEach(message => {
            console.info(message);
        })
    )
    .catch(error => {
        console.error(error);
        console.info('Server cannot start - exiting...');
        process.exit(1);
    });

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
