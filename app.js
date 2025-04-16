import 'module-alias/register';
import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';
import process from 'node:process';
import 'dotenv/config';
import express from 'express';
import { errorHandler } from './src/app/middlewares/index.js';
import { error, success } from './src/utils/index.js';

const numCpus = os.availableParallelism();

const app = express();
app.use(express.json());
app.use(errorHandler);

if (cluster.isPrimary) {
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}

export default app;
