import { Router } from "express";
import validateJOI from "../middlewares/validateJoi.js";
import { bookSchema } from "../joi/schemas.js";
import Book from "../db/booksModel.js"; // Import the Mongoose model

const bookRouter = Router();

// POST: Create a new book
bookRouter.post('/', validateJOI(bookSchema), async (req, res) => {
    try {
        const book = new Book(req.body); // Create a new instance
        const savedBook = await book.save(); // Save to MongoDB
        res.status(201).json(savedBook); // Respond with saved book
    } catch (error) {
        console.error("Error saving book:", error); // Log error
        res.status(500).json({ message: error.message }); // Send error response
    }
});

// Get all books
bookRouter.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a book by ID
bookRouter.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a book by ID
bookRouter.put('/:id', validateJOI(bookSchema), async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a book by ID
bookRouter.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default bookRouter;
