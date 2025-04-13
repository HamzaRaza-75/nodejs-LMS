import 'dotenv/config';
import express from 'express';
import { errorHandler } from './src/app/middlewares/index.js';
import { error, success } from './src/utils/index.js';

const app = express();

app.get('/', (req, res) => {
  success(res, 200, 'route hitted successfully', 'hi this is some data');
});

app.use(errorHandler);

export default app;
