import { Router } from "express";
import validateJOI from "../middlewares/validateJoi.js";
import { userSchema, updateUserSchema } from "../joi/schemas.js";
import {
    getUserById,
    searchUserByEmail,
    updateUser,
    getBooksFromUser,
    getFriendsFromUser,
    addBookToUser,
    addFriendToUser,
    deleteUser,
    sharedBooks,
} from "../controllers/user.js";

const userRouter = Router();

// User search by email
userRouter.route('/search').post(searchUserByEmail);

// User routes
userRouter.route('/:id')
    .get(getUserById) // Get user by ID
    .put(validateJOI(updateUserSchema), updateUser) // Update user
    .delete(deleteUser); // Delete user

// User books and friends
userRouter.route('/:id/books')
    .get(getBooksFromUser) // Get books from a user
    .post(addBookToUser); // Add book to user's list

userRouter.route('/:id/friends')
    .get(getFriendsFromUser) // Get friends from a user
    .post(addFriendToUser); // Add friend to user's list

userRouter.route('/:id/sharedBooks').get(sharedBooks)

export default userRouter;
