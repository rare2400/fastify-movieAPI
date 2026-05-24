'use strict';

import Fastify from "fastify";
import dotenv from "dotenv";
import mongoPlugin from "./src/plugins/mongo.js";
import movieRoutes from "./src/routes/movieRoute.js";

// Load environment variables from .env file
dotenv.config();

// Fastify server instance with logging enabled
const fastify = Fastify({ logger: true });

// CORS support to allow requests from any origin
await fastify.register(import('@fastify/cors'), {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"]
});

// Register plugins and routes
await fastify.register(mongoPlugin);
await fastify.register(movieRoutes);

// Start the server with error handling
const start = async () => {
  const port =  process.env.PORT || 3000;

  try {
    await fastify.listen({ 
      port: port,
      host: "0.0.0.0"
    });
    console.log(`Server is running on port ${ port }`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
