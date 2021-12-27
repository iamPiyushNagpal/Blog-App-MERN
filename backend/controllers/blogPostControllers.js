import blogPostModel from '../models/blogPostModel.js';
import asyncHandler from 'express-async-handler';

const createBlogPost = asyncHandler(async (req, res) => {
    const { image, title, body } = req.body;

    const blogPost = await blogPostModel.create({
        image,
        title,
        body,
        author: req.user._id
    })

    if (blogPost) {
        res.status(201);
        res.send(blogPost);
    }
})

const getBlogPosts = asyncHandler(async (req, res) => {
    const blogPosts = await blogPostModel.find({}).populate('author', 'name');
    res.send(blogPosts);
})

const getBlogPostsById = asyncHandler(async (req, res) => {
    const blogPost = await blogPostModel.findById(req.params.id).populate('author', 'name');
    res.send(blogPost);
})

export { createBlogPost, getBlogPosts, getBlogPostsById };