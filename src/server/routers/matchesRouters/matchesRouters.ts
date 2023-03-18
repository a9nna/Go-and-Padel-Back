import { Router } from "express";
import {
  createMatch,
  deleteMatchesById,
  getMatches,
} from "../../controllers/matchesControllers/matchesControllers.js";

const matchesRouters = Router();

matchesRouters.get("/", getMatches);
matchesRouters.delete("/delete/:idMatch", deleteMatchesById);
matchesRouters.post("/create", createMatch);

export default matchesRouters;
