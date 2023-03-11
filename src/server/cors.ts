import "../loadEnvironments.js";
import type cors from "cors";

const allowedOrigins = [
  `${process.env.LOCAL_ORIGIN_URL!}`,
  `${process.env.DEPLOY_ORIGIN_URL!}`,
  `${process.env.FRONT_LOCAL_ORIGIN_URL!}`,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default options;
