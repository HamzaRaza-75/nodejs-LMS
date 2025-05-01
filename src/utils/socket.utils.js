const onlineUsers = new Map(); // userId -> Set of socketIds

module.exports = {
  addUser(userId, socketId) {
    if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
    onlineUsers.get(userId).add(socketId);
  },

  removeUser(userId, socketId) {
    const sockets = onlineUsers.get(userId);
    if (sockets) {
      sockets.delete(socketId);
      if (sockets.size === 0) onlineUsers.delete(userId);
    }
  },

  getUserSockets(userId) {
    return onlineUsers.get(userId);
  },

  isUserOnline(userId) {
    return onlineUsers.has(userId);
  },
};
