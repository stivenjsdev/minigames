import { createServer } from "node:http";
import next from "next";
import { setupSocket } from "./server/socket.mjs";
import dotenv from "dotenv";
import { connectDB } from "./server/db.mjs";

// Cargar variables de entorno desde .env.local
dotenv.config({ path: ".env.local" });

const dev = process.env.NODE_ENV || "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

// Crear instancia de Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

async function start() {
  // 1. Conectar a la base de datos
  await connectDB();

  // 2. Preparar Next.js (compilar páginas, etc.)
  await app.prepare();

  // 3. Crear servidor HTTP que delega a Next.js
  const httpServer = createServer(handle);

  // 4. Adjuntar Socket.IO al servidor HTTP
  setupSocket(httpServer);

  // 5. Escuchar en el puerto
  httpServer.listen(port, () => {
    console.log(`🚀 Servidor listo en http://${hostname}:${port}`);
  });
}

start().catch((err) => {
  console.error("❌ Error fatal al iniciar el servidor:", err);
  process.exit(1);
});
