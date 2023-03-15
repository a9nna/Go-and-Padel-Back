import { Router } from "express";
import { getMatches } from "../../controllers/matchesControllers/matchesControllers.js";

const matchesRouters = Router();

matchesRouters.get("/", getMatches);

export default matchesRouters;
