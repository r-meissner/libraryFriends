import { Router } from "express";
import validateJOI from "../middlewares/validateJoi.js";
import { userSchema } from "../joi/schemas.js";

const userRouter = Router();

userRouter.route('/').get().post(validateJOI(userSchema));
userRouter.route('/:id').get().put(validateJOI(userSchema)).delete();

export default userRouter;