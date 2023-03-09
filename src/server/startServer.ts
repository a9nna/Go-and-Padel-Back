import { type CustomError } from "../CustomError/CustomError";
import app from "./index.js";

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      if (error.code === "EADDRINUSE") {
        error.message = `Error on starting the server. The port number ${port} is already in use`;
      }

      reject(error.message);
    });
  });

export default startServer;
