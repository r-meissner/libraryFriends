import { Router } from 'express';
import { getBookRequestsOfUser, createBookRequest, deleteBookRequest } from '../controllers/bookRequest.js';

const bookRequestRouter = Router();

bookRequestRouter.route('/').get(getBookRequestsOfUser).post(createBookRequest);
bookRequestRouter.route('/:id').delete(deleteBookRequest);

export default bookRequestRouter;