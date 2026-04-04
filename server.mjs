import { createServer } from "node:http";
import next from "next";
import { setupSocket } from "./server/socket.mjs";

const dev = process.env.NODE_ENV || "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

// Crear instancia de Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

async function start() {
  await app.prepare();

  const httpServer = createServer(handle);

  setupSocket(httpServer);

  httpServer.listen(port, () => {
    console.log(`🚀 Servidor listo en http://${hostname}:${port}`);
  });
}

start().catch((err) => {
  console.error("❌ Error fatal al iniciar el servidor:", err);
  process.exit(1);
});
