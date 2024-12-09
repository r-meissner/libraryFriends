import {Router} from 'express';
import { createFriendRequest, deleteFriendRequest, getFriendRequestsOfUser, getFriendRequestStatus, updateFriendRequest } from '../controllers/friendRequest.js';

const friendRequestRouter = Router();

friendRequestRouter.route('/').get(getFriendRequestsOfUser).post(createFriendRequest);
friendRequestRouter.route('/:id').put(updateFriendRequest).delete(deleteFriendRequest);
friendRequestRouter.route('/status').get(getFriendRequestStatus);

export default friendRequestRouter;