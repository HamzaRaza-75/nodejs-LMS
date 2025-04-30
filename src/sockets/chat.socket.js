const Message = require('@models/message.model');
const ChatGroup = require('@models/chatGroup.model');

module.exports = async function (chat, socket) {
  const user = socket.user;

  socket.join(`user_${user._id.toString()}`);

  const groups = await ChatGroup.find({ members: user._id });
  groups.forEach((group) => socket.join(`group_${group._id.toString()}`));

  socket.on('send_message', async (data) => {
    const { receiver, groupId, content, type = 'text' } = data;

    const newMessage = await Message.create({
      sender: user._id,
      receiver: receiver || null,
      groupId: groupId || null,
      content,
      type,
    });

    const messagePayload = {
      ...newMessage.toObject(),
      sender: { _id: user._id, name: user.name },
    };

    if (groupId) {
      chat.to(`group_${groupId}`).emit('receive_message', messagePayload);
    } else if (receiver) {
      chat.to(`user_${receiver}`).emit('receive_message', messagePayload);
      chat.to(`user_${user._id}`).emit('receive_message', messagePayload); // optional for sender UI update
    }
  });
};
