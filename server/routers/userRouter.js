import { Router } from "express";
import validateJOI from "../middlewares/validateJoi.js";
import { userSchema } from "../joi/schemas.js";
import { getUserById, searchUserByEmail } from "../controllers/user.js";

const userRouter = Router();

userRouter.route('/search').get(searchUserByEmail)
userRouter.route('/:id').get(getUserById).put(validateJOI(userSchema))

export default userRouter;