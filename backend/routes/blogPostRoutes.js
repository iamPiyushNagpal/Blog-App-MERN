import express from "express";
const router = express.Router();
import { auth } from "../middleware/authMiddleware.js";
import { createBlogPost, getBlogPosts, getBlogPostsById } from "../controllers/blogPostControllers.js";

router.route('/').get(getBlogPosts);
router.route('/:id').get(getBlogPostsById);
router.route('/create-blog-post').post(auth, createBlogPost);

export default router;