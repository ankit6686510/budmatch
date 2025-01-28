import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: '*' }, // Adjust in production
  });

  io.on('connection', (socket) => {
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
    });

    socket.on('sendMessage', async ({ chatId, senderId, text }) => {
      // Save to DB (add logic to update Chat model)
      io.to(chatId).emit('newMessage', { senderId, text, timestamp: new Date() });
    });
  });
};

export const getIO = () => io;