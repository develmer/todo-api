import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: Number(process.env.PORT)
})