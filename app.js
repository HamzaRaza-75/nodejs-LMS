require('module-alias/register');
require('dotenv/config');

const cluster = require('node:cluster');
const os = require('node:os').cpus().length; // Number of CPU cores
const express = require('express');
const { errorHandler } = require('@middlewares');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const server = createServer(app);

const io = new Server(server, {
  transports: ['websocket'],
  cors: {
    origin: ['*'],
  },
});

// (async () => {
//   try {
//     const sockets = await io.fetchSockets();
//     console.log(sockets);
//   } catch (error) {}
// })();

// const clients = io.engine.clientsCount;
// console.log(clients);
// console.log(io);

io.on('connection', (socket) => {
  console.log('socket connected successfully');
});

app.use(express.json());
app.use(errorHandler);

// if (cluster.isPrimary) {
//   for (let i = 0; i < os; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
server.listen(process.env.PORT, () => {
  console.log(`Worker ${process.pid} started on port ${process.env.PORT}`);
});
// }

module.exports = { app };
