import express from 'express';
import cors from 'cors';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js'
import userRouter from './routers/userRouter.js';
import bookRouter from './routers/bookRouter.js';
import authRouter from './routers/authRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/books', bookRouter);

app.use('*', notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => { console.log(`Server is running on port ${port}`)});