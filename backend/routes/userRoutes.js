import express from "express";
const router = express.Router();
import { login, signup } from "../controllers/userControllers.js";

router.route('/').post(signup);
router.route('/login').post(login);

export default router;