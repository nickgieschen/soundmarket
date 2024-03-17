import route1 from "./routes/route1"
import fastifyPostgres from "@fastify/postgres"
import fastify from "fastify"
import buildAdmin from "./admin"
import fastifyEnv from "@fastify/env"
import configOptions from "./config"

// todo remove packages external in build script and use esbuild config

const start = async () => {

    const app = fastify({
        logger: (process.env.NODE_ENV !== "development"),
    })

    await app.register(fastifyEnv, configOptions)

    app.register(fastifyPostgres, {
        connectionString: app.config.DATABASE_URL,
    })

    app.register(route1)

    const admin = await buildAdmin(app)
    const host = "0.0.0.0"

    try {
        await app.listen({port: app.config.PORT, host: host})
        console.log(`Fastify started at http://${host}:${app.config.PORT}`)
        console.log(`AdminJS started at http://${host}:${app.config.PORT}${admin.options.rootPath}`)
        console.log(`Settings: ${JSON.stringify(app.config, null, 2)}`)
    } catch (err) {
        console.error(err)
    }
}

export default start