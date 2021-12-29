import express from "express";
const router = express.Router();
import { auth } from "../middleware/authMiddleware.js";
import {
    createBlogPost, deletePost, getBlogPosts, getBlogPostsByAuthor, getBlogPostsById,
    updateBlogPost
} from "../controllers/blogPostControllers.js";

router.route('/').get(getBlogPosts);
router.route('/:id')
    .get(getBlogPostsById)
    .delete(auth, deletePost)
    .put(auth, updateBlogPost);
router.route('/create-blog-post').post(auth, createBlogPost);
router.route('/author/:id').get(getBlogPostsByAuthor);

export default router;