import {Router} from 'express';
import { createFriendRequest, deleteFriendRequest, getFriendRequestsOfUser } from '../controllers/friendRequest.js';

const friendRequestRouter = Router();

friendRequestRouter.route('/').get(getFriendRequestsOfUser).post(createFriendRequest);
friendRequestRouter.route('/:id').delete(deleteFriendRequest);

export default friendRequestRouter;