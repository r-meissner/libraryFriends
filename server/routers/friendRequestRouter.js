import {Router} from 'express';
import { createFriendRequest, deleteFriendRequest, getIncomingFriendRequestsOfUser, getOutgoingFriendRequestsOfUser, getFriendRequestStatus, updateFriendRequest } from '../controllers/friendRequest.js';

const friendRequestRouter = Router();

friendRequestRouter.route('/').post(createFriendRequest);
friendRequestRouter.route('/incoming').get(getIncomingFriendRequestsOfUser);
friendRequestRouter.route('/outgoing').get(getOutgoingFriendRequestsOfUser);
friendRequestRouter.route('/:id').put(updateFriendRequest).delete(deleteFriendRequest);
friendRequestRouter.route('/status').get(getFriendRequestStatus);

export default friendRequestRouter;