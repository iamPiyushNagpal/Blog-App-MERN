import express from "express";
const router = express.Router();
import { auth } from "../middleware/authMiddleware.js";
import { createBlogPost } from "../controllers/blogPostControllers.js";

router.route('/create-blog-post').post(auth, createBlogPost);

export default router;