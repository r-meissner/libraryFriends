import { Router } from 'express';
import { getBookRequestsOfUser, createBookRequest, deleteBookRequest, updateBookRequest } from '../controllers/bookRequest.js';

const bookRequestRouter = Router();

bookRequestRouter.route('/:userId').get(getBookRequestsOfUser).post(createBookRequest);
bookRequestRouter.route('/:id').put(updateBookRequest).delete(deleteBookRequest);

export default bookRequestRouter;