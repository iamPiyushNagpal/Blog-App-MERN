import express from 'express';
import './config/env.js';
import connectDb from './database/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

connectDb();

const port = process.env.PORT;

const app = express();

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send("hello");
})

app.listen(port, () => console.log(`Server started spinning on port ${port}`));