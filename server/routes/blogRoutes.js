import express, { Router } from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createBlog, getAllBlogs } from "../controllers/BlogController.js";
const router = express.Router();

router.post('/uploadblog',userAuth,createBlog)

router.get('/blogs',getAllBlogs)

export default router;