import { Router } from "express";
import validateJOI from "../middlewares/validateJoi.js";
import { loginSchema, userSchema } from "../joi/schemas.js";
import verifyToken from "../middlewares/verifyToken.js";
import { getMe, login, logout, signUp } from "../controllers/auth.js";

const authRouter = Router();

authRouter.route('/me').get(verifyToken, getMe);
authRouter.route('/signup').post(validateJOI(userSchema), signUp);
authRouter.route('/login').post(validateJOI(loginSchema), login);
authRouter.route('/logout').delete(logout);

export default authRouter;