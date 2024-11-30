import Book from "../models/booksModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Create a new book
export const createBook = asyncHandler(async (req, res, next) => {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
});

// Get all books
export const getAllBooks = asyncHandler(async (req, res, next) => {
    const books = await Book.find();
    res.status(200).json(books);
});

// Get a book by ID
export const getBookById = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return next(new ErrorResponse("Book not found", 404)); // Use ErrorResponse
    }
    res.status(200).json(book);
});

// Update a book by ID
export const updateBookById = asyncHandler(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
        return next(new ErrorResponse("Book not found", 404)); // Use ErrorResponse
    }
    res.status(200).json(book);
});

// Delete a book by ID
export const deleteBookById = asyncHandler(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return next(new ErrorResponse("Book not found", 404)); // Use ErrorResponse
    }
    res.status(200).json({ message: "Book deleted successfully" });
});
