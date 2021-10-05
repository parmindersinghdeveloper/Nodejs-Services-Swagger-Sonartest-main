/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express, { Application, Request, Response } from "express";

import cors from "cors";
import helmet from "helmet";
dotenv.config();
import { userRouter } from "./routes/user.router";
import { mainRouter } from "./routes/main.router";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import axios from "axios";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerDocuemnt from "./swagger.json";

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

/**
 *  App Configuration
 */
const app: Application = express();
app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerDocuemnt))
app.use(helmet());
app.use(cors());
app.use(express.json());
var accessLogStream = fs.createWriteStream(path.join(__dirname, '../api.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }));
//user api routes
app.use("/user", userRouter);

app.use("/", mainRouter);
app.use(errorHandler);
app.use(notFoundHandler);
/**
 * Server Activation
 */

 

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
