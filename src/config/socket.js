const jwt = require('jsonwebtoken');
const User = require('@models/user.model');
const chatSocket = require('@sockets/chat.socket');
const notifSocket = require('@sockets/notification.socket');
const socketUsers = require('@utils/socket.utils');

module.exports = function (io) {
  const chat = io.of('/chat');
  const notifications = io.of('/notifications');

  const authMiddleware = async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return next(new Error('Unauthorized'));
      socket.user = user;
      next();
    } catch {
      next(new Error('Authentication error'));
    }
  };

  chat.use(authMiddleware).on('connection', (socket) => {
    const user = socket.user;
    socketUsers.addUser(user._id.toString(), socket.id);

    socket.on('disconnect', () => {
      socketUsers.removeUser(user._id.toString(), socket.id);
    });
    chatSocket(chat, socket);
  });

  notifications.use(authMiddleware).on('connection', (socket) => {
    notifSocket(notifications, socket);
  });
};
