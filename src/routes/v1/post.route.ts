import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "@/controllers/post.controller";

const router = express.Router();

router.get("/post/query", getAllPosts);
router.get("/post/query/detail", getPost);
router.post("/post/command", createPost);
router.put("/post/command", updatePost);
router.delete("/post/command", deletePost);

export default router;
