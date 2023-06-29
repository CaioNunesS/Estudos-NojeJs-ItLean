import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import helmet from 'helmet'; //
import cors from 'cors';

import { errorHandler, notFound, logMiddleware } from './middleware/index.js';

import routes from './routes.js';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logMiddleware);

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
