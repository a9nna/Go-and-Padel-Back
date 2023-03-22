import { Router } from "express";
import {
  createMatch,
  deleteMatchesById,
  getMatchById,
  getMatches,
} from "../../controllers/matchesControllers/matchesControllers.js";

const matchesRouters = Router();

matchesRouters.get("/", getMatches);
matchesRouters.delete("/delete/:idMatch", deleteMatchesById);
matchesRouters.post("/create", createMatch);
matchesRouters.get("/:idMatch", getMatchById);

export default matchesRouters;
