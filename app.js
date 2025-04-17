require('module-alias/register');
require('dotenv/config');

const cluster = require('node:cluster');
const os = require('node:os').availableParallelism();
const express = require('express');
const { errorHandler } = require('@middlewares/index');

const app = express();

app.use(express.json());
app.use(errorHandler);

if (cluster.isPrimary) {
  for (let i = 0; i < os; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    // console.log(`worker ${worker.process.pid} died`);
  });
}

module.exports = { app };
