import { Router } from "express";
import validateJOI from "../middlewares/validateJoi";

const userRouter = Router();

userRouter.route('/').get().post(validateJOI(userRouter));
userRouter.route('/:id').get().put(validateJOI(userRouter)).delete();

export default userRouter;