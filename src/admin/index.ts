import AdminJS from "adminjs"
import {Adapter, Database, Resource} from "@adminjs/sql"
import adminJSFastify from "@adminjs/fastify"
import buildGenres from "./resources/genres"
import type {FastifyInstance} from "fastify"
import {componentLoader} from "./components"
import pgConnectionString from "pg-connection-string"

const build = async (app: FastifyInstance) => {
    AdminJS.registerAdapter({
        Database,
        Resource,
    })

    const connStringParts = pgConnectionString.parse(app.config.DATABASE_URL)
    const db = await new Adapter("postgresql", {
        connectionString: app.config.DATABASE_URL,
        database: connStringParts.database!,
        ...(app.config.NODE_ENV !== "development" && {
            ssl: {
                rejectUnauthorized: false
            }
        })
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