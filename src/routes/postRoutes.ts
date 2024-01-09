import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts", getPost);
router.post("/posts", createPost);
router.put("/posts", updatePost);
router.delete("/posts", deletePost);

export default router;
