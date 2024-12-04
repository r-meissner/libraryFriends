import express from 'express';
import cors from 'cors';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js'
import userRouter from './routers/userRouter.js';
import bookRouter from './routers/bookRouter.js';
import authRouter from './routers/authRouter.js';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';
//needed for deployment:
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    const buildPath = path.join(__dirname, '../client/dist');
    app.use(express.static(buildPath));
    
    app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
  }

app.use('*', notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => { console.log(`Server is running on port ${port}`)});