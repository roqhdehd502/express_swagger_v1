import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "@/controllers/post.controller";

const router = express.Router();

router.get("/query/post", getAllPosts);
router.get("/query/post/:seq", getPost);
router.post("/command/post", createPost);
router.put("/command/post", updatePost);
router.delete("/command/post", deletePost);

export default router;
