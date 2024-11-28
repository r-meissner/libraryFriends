import { Router } from "express";
import validateJOI from "../middlewares/validateJoi.js";
import { bookSchema } from "../joi/schemas.js";

const bookRouter = Router();

bookRouter.route('/').get().post(validateJOI(bookSchema));
bookRouter.route('/:id').get().put(validateJOI(bookSchema)).delete();

export default bookRouter;