import express from "express";
const router = express.Router();
import { auth } from "../middleware/authMiddleware.js";
import {
    createBlogPost, deletePost, getBlogPosts, getBlogPostsByAuthor, getBlogPostsById
} from "../controllers/blogPostControllers.js";

router.route('/').get(getBlogPosts);
router.route('/:id').get(getBlogPostsById).delete(auth, deletePost);
router.route('/create-blog-post').post(auth, createBlogPost);
router.route('/author/:id').get(getBlogPostsByAuthor);

export default router;