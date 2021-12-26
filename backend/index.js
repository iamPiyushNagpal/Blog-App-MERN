import express from 'express';
import './config/env.js';
import connectDb from './database/db.js';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

connectDb();

const port = process.env.PORT || 3001;

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json());

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send("hello");
})

app.listen(port, () => console.log(`Server started spinning on port ${port}`));