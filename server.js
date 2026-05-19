'use strict';

import Fastify from 'fastify';

const fastify = Fastify({ logger: true });
const PORT = 3000;


const start = async () => {
  try {
    await fastify.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
