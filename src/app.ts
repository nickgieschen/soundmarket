import route1 from "./routes/route1";
import fastifyPostgres from "@fastify/postgres";
import fastify from "fastify";
import buildAdmin from "./admin";

// todo remove packages external in build script and use esbuild config

const start = async () => {

    const app = fastify({
        logger: (process.env.NODE_ENV !== "development"),
    });

    app.register(fastifyPostgres, {
        connectionString: 'postgres://localhost/soundmarket'
    });

    app.register(route1);

    const admin = await buildAdmin(app)

    const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

    app.listen({port: FASTIFY_PORT}, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log(`Fastify started at http://localhost:${FASTIFY_PORT}`);
            console.log(`AdminJS started at http://localhost:${FASTIFY_PORT}${admin.options.rootPath}`)
        }
    })
}

export default start;