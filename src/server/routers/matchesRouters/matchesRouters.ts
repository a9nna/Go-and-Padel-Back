import { Router } from "express";
import {
  deleteMatchesById,
  getMatches,
} from "../../controllers/matchesControllers/matchesControllers.js";

const matchesRouters = Router();

matchesRouters.get("/", getMatches);
matchesRouters.delete("/delete/:idMatch", deleteMatchesById);

export default matchesRouters;
