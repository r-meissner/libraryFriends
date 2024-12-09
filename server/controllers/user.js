import User from "../models/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// GET User by ID
export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) throw new ErrorResponse("User not found", 404);
    res.status(200).json(user);
});

// GET User by Email
export const searchUserByEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) throw new ErrorResponse("Email is required", 400);
    const user = await User.findOne({ email });
    if (!user) throw new ErrorResponse("User not found", 404);
    res.status(200).json(user);
});

// GET Books from a User
export const getBooksFromUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate({
        path: 'books._id',
    })
        .populate({
            path: 'books.owner',
        })
        .populate({
            path: 'books.currentReader',
        })

    if (!user) throw new ErrorResponse("User not found", 404);
    res.status(200).json(user.books);
});

// GET Friends from a User
export const getFriendsFromUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("friends._id");
    if (!user) throw new ErrorResponse("User not found", 404);
    res.status(200).json(user.friends);
});

// UPDATE a User by ID
export const updateUser = asyncHandler(async (req, res, next) => {
    const { password, ...updateData } = req.body; // Extract password and other fields

    // Hash password if it's being updated
    if (password) {
        updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json(user);
});

// POST a Book to User's Books List
export const addBookToUser = asyncHandler(async (req, res) => {
    const { id } = req.params; // User ID
    const { bookId, owner, currentReader, borrowedDate, returnDate } = req.body; // added Additional fields

    const user = await User.findById(id);
    if (!user) throw new ErrorResponse("User not found", 404);

    // Added the book to the user's books list with additional fields
    user.books.push({
        _id: bookId,
        owner,
        currentReader,
        borrowedDate,
        returnDate,
    });

    await user.save();

    res.status(200).json(user);
});


// POST a Friend to User's Friends List
export const addFriendToUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { friendId } = req.body;
    const user = await User.findById(id);
    if (!user) throw new ErrorResponse("User not found", 404);

    user.friends.push({ _id: friendId });
    await user.save();
    res.status(200).json(user);
});

// DELETE a User
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({ message: "User deleted successfully" });
});

