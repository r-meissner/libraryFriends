import { Router } from "express";

const bookRouter = Router();

bookRouter.route('/').get().post();
bookRouter.route('/:id').get().put().delete();

export default bookRouter;