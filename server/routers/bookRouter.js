import { Router } from "express";
import validateJOI from "../middlewares/validateJoi";
import { bookSchema } from "../joi/schemas";

const bookRouter = Router();

bookRouter.route('/').get().post(validateJOI(bookSchema));
bookRouter.route('/:id').get().put(validateJOI(bookSchema)).delete();

export default bookRouter;