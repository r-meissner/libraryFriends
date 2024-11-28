import { Router } from "express";

const authRouter = Router();

authRouter.route('/me').get();
authRouter.route('/signup').post();
authRouter.route('/login').post();
authRouter.route('/logout').delete();

export default authRouter;