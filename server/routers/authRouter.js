import { Router } from "express";
import validateJOI from "../middlewares/validateJoi";
import { loginSchema, userSchema } from "../joi/schemas";

const authRouter = Router();

authRouter.route('/me').get();
authRouter.route('/signup').post(validateJOI(userSchema));
authRouter.route('/login').post(validateJOI(loginSchema));
authRouter.route('/logout').delete();

export default authRouter;