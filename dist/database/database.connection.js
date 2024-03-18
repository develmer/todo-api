"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let config;
if (process.env.NODE_ENV == "dev") {
    config = {
        host: process.env.POSTGRES_HOST_DEV,
        port: Number(process.env.POSTGRES_PORT_DEV),
        database: process.env.POSTGRES_DB_DEV,
        user: process.env.POSTGRES_USER_DEV,
        password: process.env.POSTGRES_PASSWORD_DEV
    };
}
else if (process.env.NODE_ENV == "test") {
    config = {
        host: process.env.POSTGRES_HOST_TEST,
        port: Number(process.env.POSTGRES_PORT_TEST),
        database: process.env.POSTGRES_DB_TEST,
        user: process.env.POSTGRES_USER_TEST,
        password: process.env.POSTGRES_PASSWORD_TEST
    };
}
else {
    config = {
        host: process.env.POSTGRES_HOST_PROD,
        port: Number(process.env.POSTGRES_PORT_PROD),
        database: process.env.POSTGRES_DB_PROD,
        user: process.env.POSTGRES_USER_PROD,
        password: process.env.POSTGRES_PASSWORD_PROD
    };
}
exports.pool = new pg_1.Pool(config);
