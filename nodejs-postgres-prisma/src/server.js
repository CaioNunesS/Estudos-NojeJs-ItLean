import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cors from 'cors';

import routes from './routes.js';
import { logMiddleware } from './middleware/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logMiddleware);

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
