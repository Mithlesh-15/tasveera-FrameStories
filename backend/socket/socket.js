import { Server } from "socket.io";

let io;

// Track online users safely

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  const onlineUsers = new Map();
  io.on("connection", (socket) => {
    console.log("🔥 Socket connected:", socket.id);

    socket.on("join", (userId) => {
      console.log("👤 User joined room:", userId);

      onlineUsers.set(userId.toString(), socket.id);
      socket.join(userId.toString());

      // Broadcast updated online users list
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      // Broadcast updated online users list
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  return io;
};

export { io };
