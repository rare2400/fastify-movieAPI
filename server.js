'use strict';

import Fastify from "fastify";
import dotenv from "dotenv";
import mongoPlugin from "./src/plugins/mongo.js";
import movieRoutes from "./src/routes/MovieRoute.js";

// Load environment variables from .env file
dotenv.config();

// Fastify server instance with logging enabled
const fastify = Fastify({ logger: true });


// Register plugins and routes
await fastify.register(mongoPlugin);
await fastify.register(movieRoutes);

// Start the server with error handling
const start = async () => {
  const port =  process.env.PORT || 3000;

  try {
    await fastify.listen({ port: port });
    console.log(`Server is running on port ${ port }`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
