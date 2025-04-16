require('module-alias/register');
const cluster = require('node:cluster');
const os = require('node:os');
require('dotenv/config');
const express = require('express');
// import { errorHandler } from '@middlewares';

const numCpus = os.availableParallelism();

const app = express();
app.use(express.json());
// app.use(errorHandler);

if (cluster.isPrimary) {
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}

module.exports = { app };
