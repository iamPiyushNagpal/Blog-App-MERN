import userModel from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const signup = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error('User already exists.')
    }

    const user = await userModel.create({
        name, email, password, isAdmin
    })

    if (user) {
        res.status(201);
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: user.generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    if (await user.matchPassword(password)) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: user.generateToken(user._id)
        })
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

export { signup, login };