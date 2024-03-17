import AdminJS from "adminjs"
import {Adapter, Database, Resource} from "@adminjs/sql"
import adminJSFastify from "@adminjs/fastify"
import buildGenres from "./resources/genres"
import type {FastifyInstance} from "fastify"
import {componentLoader} from "./components"

const build = async (app: FastifyInstance) => {
    AdminJS.registerAdapter({
        Database,
        Resource,
    })

    const db = await new Adapter("postgresql", {
        connectionString: "postgres://localhost/soundmarket",
        database: "soundmarket",
    }).init()

    const admin = new AdminJS({
        defaultTheme: "dark",
        resources: [buildGenres(db)],
        rootPath: "/admin",
        componentLoader,
    })

    await adminJSFastify.buildRouter(
        admin,
        app
    )

    await admin.watch()

    return admin
}

export default build