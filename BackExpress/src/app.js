import express from "express";
import routes from "./routes/task.routes.js";
import cors from 'cors';
import { createConnection } from "./database.js";

const app = express(); 

// creating database
await createConnection();

// cors permissions
app.use(cors());

// request json type
app.use(express.json());

// routes prefix api
app.use("/api", routes);

export default app;
