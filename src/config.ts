import {JSONSchemaType} from "env-schema"

type Env = {
    DATABASE_URL: string
    PORT: number
    NODE_ENV: string
}

declare module "fastify" {
    interface FastifyInstance {
        config: Env
    }
}

const envSchema: JSONSchemaType<Env> = {
    type: "object",
    properties: {
        DATABASE_URL: {
            type: "string",
            default: "postgres://localhost/soundmarket"
        },
        PORT: {
            type: "number",
            default: 3000
        },
        NODE_ENV: {
            type: "string",
            default: "development"
        }
    },
    required: ["DATABASE_URL", "PORT", "NODE_ENV"],
    additionalProperties: false,
}


const configOptions = {
    confKey: "config",
    dotenv: true,
    data: process.env,
    schema: envSchema,
}

export default configOptions