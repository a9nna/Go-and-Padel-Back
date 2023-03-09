import express from "express";
import morgan from "morgan";
import cors from "cors";
import options from "./cors.js";
import usersRouter from "./routers/usersRouters/usersRouters.js";
import { generalError, notFoundError } from "./middlewares/errors.js";

const app = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(cors(options));
app.use(express.json());

app.use("/users", usersRouter);

app.use("/", notFoundError);
app.use("/", generalError);

export default app;
