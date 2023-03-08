import { Joi } from "express-validation";

const loginSchema = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default loginSchema;
