require('module-alias/register');
require('dotenv/config');

const cluster = require('node:cluster');
const os = require('node:os').cpus().length; // Number of CPU cores
const express = require('express');
const { errorHandler } = require('@middlewares/index');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const server = createServer(app);

const io = new Server(server, {
  /* options */
});

io.on('connection', (socket) => {
  console.log(socket.id); // Log socket connection
});

// Use middlewares and error handling
app.use(express.json());
app.use(errorHandler);

// Cluster setup (for multi-core processing)
if (cluster.isPrimary) {
  for (let i = 0; i < os; i++) {
    cluster.fork(); // Fork worker processes based on available CPUs
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  server.listen(process.env.PORT, () => {
    console.log(`Worker ${process.pid} started on port ${process.env.PORT}`);
  });
}

module.exports = { app };
