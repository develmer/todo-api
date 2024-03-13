import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();

let config: object;
if (process.env.NODE_ENV == "dev") {
    config = {
        host: process.env.POSTGRES_HOST_DEV,
        port: Number(process.env.POSTGRES_PORT_DEV),
        database: process.env.POSTGRES_DB_DEV,
        user: process.env.POSTGRES_USER_DEV,
        password: process.env.POSTGRES_PASSWORD_DEV
    }
} else if (process.env.NODE_ENV == "test") {
    config = {
        host: process.env.POSTGRES_HOST_TEST,
        port: Number(process.env.POSTGRES_PORT_TEST),
        database: process.env.POSTGRES_DB_TEST,
        user: process.env.POSTGRES_USER_TEST,
        password: process.env.POSTGRES_PASSWORD_TEST
    }
} else {
    config = {
        host: process.env.POSTGRES_HOST_PROD,
        port: Number(process.env.POSTGRES_PORT_PROD),
        database: process.env.POSTGRES_DB_PROD,
        user: process.env.POSTGRES_USER_PROD,
        password: process.env.POSTGRES_PASSWORD_PROD
    }
}

export const pool = new Pool(config);