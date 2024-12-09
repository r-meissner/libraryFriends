import {Router} from 'express';
import { createFriendRequest, deleteFriendRequest, getFriendRequestsOfUser, getFriendRequestStatus, updateFriendRequest } from '../controllers/friendRequest.js';

const friendRequestRouter = Router();

friendRequestRouter.route('/').get(getFriendRequestsOfUser).get(getFriendRequestStatus).post(createFriendRequest);
friendRequestRouter.route('/:id').put(updateFriendRequest).delete(deleteFriendRequest);

export default friendRequestRouter;