import express from "express";
import {
  getPostList,
  getPost,
  postPost,
  putPost,
  deletePost,
} from "../../controllers/post.controller";
import {
  getPostListValidator,
  getPostValidator,
  postPostValidator,
  putPostValidator,
  deletePostValidator,
} from "../../validators/post.validator";

const router = express.Router();

router.get("/post", getPostListValidator, getPostList);
router.get("/post/:_id", getPostValidator, getPost);
router.post("/post", postPostValidator, postPost);
router.put("/post/:_id", putPostValidator, putPost);
router.delete("/post/:_id", deletePostValidator, deletePost);

export default router;
