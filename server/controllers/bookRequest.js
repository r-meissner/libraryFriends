import BookRequest from "../models/BookRequest.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getBookRequestsOfUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) throw new ErrorResponse('UserId missing', 400);
    const sentRequests = await BookRequest.find({ requestingUser: userId, status: 'open' }).populate('owner', 'userName email avatar').populate('book');
    const receivedRequests = await BookRequest.find({ owner: userId, status: 'open' }).populate('requestingUser', 'userName email avatar').populate('book');
    res.status(200).json({
      sentRequests: sentRequests,
      receivedRequests: receivedRequests,
    });
  });
  
  export const createBookRequest = asyncHandler(async (req, res) => {
    const { owner, book, requestingUser, status } = req.body;
    if(!owner || !book || !requestingUser || !status) throw new ErrorResponse('Missing data', 400);
    const newBookRequest = await BookRequest.create({
      owner,
      book,
      requestingUser,
      status,
    });
    res.status(201).json(newBookRequest);
  });
  
  export const deleteBookRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const bookRequest = await BookRequest.findByIdAndDelete(id);
    if (!bookRequest) throw new ErrorResponse('Book request not found', 404);
    res.status(200).json({ message: 'Book request deleted' });
  });
