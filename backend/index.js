import express from 'express';
import './config/env.js';
import connectDb from './database/db.js';

connectDb();

const port = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
    res.send("hello");
})

app.listen(port, () => console.log(`Server started spinning on port ${port}`));