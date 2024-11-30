import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isProduction = process.env.NODE_ENV === 'production';
const cookiesOptions = {
  httpOnly: true,
  sameSite: isProduction ? 'None' : 'Lax',
  secure: isProduction,
};

export const getMe = asyncHandler(async (req, res) => {
  //userId needs to be added to request by verifying the token -> done by verifyToken middleware added in authRouter
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new ErrorResponse('Invalid credentials', 401);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ErrorResponse('Invalid credentials', 401);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, cookiesOptions);
    res.json({ message: 'User Logged in Successfully' });
  });

export const signUp = asyncHandler(async (req, res) => {
  const { userName, email, password, city, country, avatar} = req.body;
  const alreadyExist = await User.findOne({ email });
  if (alreadyExist) throw new ErrorResponse("User Already Exists", 400);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
    city,
    country,
    avatar
  });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, cookiesOptions);
  res.json({ message: "User Created Successfully" });
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie('token', cookiesOptions);
    res.json({ message: 'User logged out successfully' });
  });