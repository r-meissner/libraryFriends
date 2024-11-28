import { Router } from "express";

const userRouter = Router();

userRouter.route('/').get().post();
userRouter.route('/:id').get().put().delete();

export default userRouter;