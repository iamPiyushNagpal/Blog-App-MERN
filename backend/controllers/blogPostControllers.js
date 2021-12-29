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

const getBlogPostsByAuthor = asyncHandler(async (req, res) => {
    const blogPosts = await blogPostModel.find({ author: req.params.id });
    res.send(blogPosts);
})

const deletePost = asyncHandler(async (req, res) => {
    const blogPost = await blogPostModel.findById(req.params.id);
    if (blogPost) {
        await blogPost.remove();
        res.send({ message: 'BlogPost Removed' });
    }
    else {
        res.status(404);
        throw new Error('BlogPost not found');
    }
})

const updateBlogPost = asyncHandler(async (req, res) => {
    const { image, title, body } = req.body;

    const blogPost = await blogPostModel.findById(req.params.id);
    if (blogPost) {
        blogPost.image = image
        blogPost.title = title
        blogPost.body = body
        const updatedBlogPost = await blogPost.save();
        res.send(updatedBlogPost);
    }
    else {
        res.status(404);
        throw new Error('BlogPost not found');
    }
})

export {
    createBlogPost, getBlogPosts, getBlogPostsById, getBlogPostsByAuthor,
    deletePost, updateBlogPost
};