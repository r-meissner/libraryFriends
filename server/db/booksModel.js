import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    pages: { type: Number, required: true },
    publisher: { type: String, required: true },
    year: { type: String, required: true },
    edition: { type: String },
    description: { type: String },
    cover: { type: String },
  }, {
    timestamps: true // Adds createdAt and updatedAt fields
  });
  

const Book = mongoose.model('Book', bookSchema, 'books');


export default Book;