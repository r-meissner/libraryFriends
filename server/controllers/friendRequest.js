import FriendRequest from "../models/FriendRequest.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getFriendRequestsOfUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) throw new ErrorResponse('UserId missing', 400);
    const sentRequests = await FriendRequest.find({requestingUser: userId, status: 'open'}).populate('targetUser','userName email avatar');
    const receivedRequests = await FriendRequest.find({targetUser: userId, status: 'open'}).populate('requestingUser', 'userName email avatar');
    res.status(200).json({
        sentRequests: sentRequests,
        receivedRequests: receivedRequests,
    });
});

export const getFriendRequestStatus = asyncHandler(async (req, res) => {
    const { targetUser, requestingUser } = req.body;
    if (!targetUser || !requestingUser) throw new ErrorResponse('Missing data', 400);
    const friendRequest = await FriendRequest.findOne({targetUser, requestingUser});
    if (!friendRequest) throw new ErrorResponse('Friend request not found', 404);
    res.status(200).json(friendRequest.status);
});

export const createFriendRequest = asyncHandler(async (req, res) => {
    const {targetUser, requestingUser, status} = req.body;
    if(!targetUser || !requestingUser || !status) throw new ErrorResponse('Missing data', 400);
    const newFriendRequest = await FriendRequest.create({
        targetUser,
        requestingUser,
        status,
    });
    res.status(201).json(newFriendRequest);
});

export const deleteFriendRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const friendRequest = await FriendRequest.findByIdAndDelete(id);
    if (!friendRequest) throw new ErrorResponse('Friend request not found', 404);
    res.status(200).json({ message: 'Friend request deleted' });
  });

export const updateFriendRequest = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const friendRequest = await FriendRequest.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!friendRequest) {
        return next(new ErrorResponse("Friend request not found", 404));
    }
    res.status(201).json(friendRequest);
})