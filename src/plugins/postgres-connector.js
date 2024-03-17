// ESM
import fastifyPlugin from 'fastify-plugin';
import fastifyPostgres from "@fastify/postgres";

async function dbConnector(fastify, options) {
  fastify.register(fastifyPostgres, {
    connectionString: 'postgres://localhost/soundmarket'
  });
}

export default fastifyPlugin(dbConnector);
