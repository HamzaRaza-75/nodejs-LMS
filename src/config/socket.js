const jwt = require('jsonwebtoken');
const User = require('@models/user.model');
const chatSocket = require('@sockets/chat.socket');
const notifSocket = require('@/notification.socket');

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
    chatSocket(chat, socket);
  });

  notifications.use(authMiddleware).on('connection', (socket) => {
    notifSocket(notifications, socket);
  });
};
