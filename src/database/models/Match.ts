import { Schema, model } from "mongoose";

const matchSchema = new Schema({
  creator: String,
  category: String,
  date: Date,
  level: String,
  paddleCourt: Number,
  signedPlayersNumber: Number,
  image: String,
  allowedPlayersNumber: Number,
});

const Match = model("Match", matchSchema, "matches");

export default Match;
