import { Router } from "express";
import { validate } from "express-validation";
import { loginUser } from "../../controllers/usersControllers/usersControllers.js";
import loginSchema from "../../schemas/userSchema.js";

const usersRouter = Router();

usersRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default usersRouter;
