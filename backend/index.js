import path from 'path';
import express from 'express';
import './config/env.js';
import connectDb from './database/db.js';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import blogPostRoutes from './routes/blogPostRoutes.js'

connectDb();

const port = process.env.PORT || 3001;

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogPostRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send("hello");
})

app.listen(port, () => console.log(`Server started spinning on port ${port}`));