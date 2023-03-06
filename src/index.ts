import "./loadEnvironments.js";
import createDebug from "debug";
import chalk from "chalk";
import startServer from "./server/startServer.js";

const debug = createDebug("app");
const port = process.env.PORT!;

try {
  await startServer(Number(port));
  debug(chalk.bgGreen(`Start with server 'http://localhost:${port}'`));
} catch (error) {
  debug(chalk.bgRed(error.message));
}
