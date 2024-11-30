import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new ErrorResponse("User not found", 404);
  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userName, email, password, city, country, avatar } = req.body;
  if (!userName || !email)
    throw new ErrorResponse("Username and email are required", 400);
  let updateFields = { userName, email, city, country, avatar };
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateFields.password = hashedPassword;
  }
  const user = await User.findByIdAndUpdate(id, updateFields, { new: true });
  if (!user) throw new ErrorResponse("User not found", 404);
  res.status(200).json(user);
});

export const searchUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new ErrorResponse("Email is required", 400);
  const user = await User.findOne({ email });
  if (!user) throw new ErrorResponse("User not found", 404);
  res.status(200).json(user);
});
