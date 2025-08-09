import app from "./app"; // your Express app
import http from "http";
import { config } from "./config";
const PORT = config.port
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown signals
const shutdown = (signal: string) => {
  console.log(`Received ${signal}. Closing server...`);

  // Stop accepting new requests
  server.close((err) => {
    if (err) {
      console.error("Error during server close:", err);
      process.exit(1);
    }

    // TODO: Close DB connections, workers, etc. here
    console.log("Server closed gracefully.");
    process.exit(0);
  });

  // Force exit if not closed within 10 seconds
  setTimeout(() => {
    console.error("Forcefully shutting down.");
    process.exit(1);
  }, 10_000);
};

// Listen to termination signals
process.on("SIGINT", () => shutdown("SIGINT"));   // Ctrl+C
process.on("SIGTERM", () => shutdown("SIGTERM")); // kill command, container stop
