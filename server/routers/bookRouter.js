import { Router } from "express";
import validateJOI from "../middlewares/validateJoi.js";
import { bookSchema } from "../joi/schemas.js";
import { createBook, getAllBooks, getBookById, updateBookById, deleteBookById,} from "../controllers/bookFunctions.js";

const bookRouter = Router();

bookRouter.post('/', validateJOI(bookSchema), createBook); // POST: Create a book
bookRouter.get('/', getAllBooks); // GET: Get all books
bookRouter.get('/:id', getBookById); // GET: Get a book by ID
bookRouter.put('/:id', validateJOI(bookSchema), updateBookById); // PUT: Update a book by ID
bookRouter.delete('/:id', deleteBookById); // DELETE: Delete a book by ID

export default bookRouter;
