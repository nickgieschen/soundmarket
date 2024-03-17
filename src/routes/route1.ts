// @ts-ignore
const routes = async (fastify, opts) => {
  // @ts-ignore
    fastify.get('/', async (request, reply) => {
    try {
      //const res = await fastify.pg.query('SELECT * FROM moods', "");
      return "poo"
    } catch (err) {
      return err;
    }
  });
};

export default routes;