import express from "express";
import indexRoutes from "./routes/index";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(indexRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listens on port ${process.env.PORT} in ${process.env.NODE_ENV} environment.`);
});