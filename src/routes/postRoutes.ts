import express from "express";
import { getAllPosts } from "../controllers/postController";

const router = express.Router();

router.get("/posts", getAllPosts);
// TODO: 다른 CRUD 라우트들도 유사한 방식으로 추가할 것

export default router;
