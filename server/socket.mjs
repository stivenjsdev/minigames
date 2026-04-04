import { Server } from "socket.io";

export function setupSocket(httpServer) {
  const io = new Server(httpServer);

  // Escuchar nuevas conexiones de clientes
  io.on("connection", async (socket) => {
    console.log(`✅ Cliente conectado: ${socket.id}`);

    socket.on("disconnect", async () => {
      console.log(`🍉 Cliente desconectado: ${socket.id}`);
    });
  });

  return io;
}
