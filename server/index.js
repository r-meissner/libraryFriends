import express from 'express';
import cors from 'cors';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routers go here
app.use('*', notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => { console.log(`Server is running on port ${port}`)});