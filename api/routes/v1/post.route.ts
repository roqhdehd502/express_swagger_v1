import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../../controllers/post.controller";
import {
  createPostValidator,
  updatePostValidator,
  getPostValidator,
  deletePostValidator,
} from "../../validators/post.validator";

const router = express.Router();

router.get("/post/query", getAllPosts);
router.get("/post/query/:seq", getPostValidator, getPost);
router.post("/post/command", createPostValidator, createPost);
router.put("/post/command", updatePostValidator, updatePost);
router.delete("/post/command", deletePostValidator, deletePost);

export default router;
