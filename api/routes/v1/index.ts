import express from "express";
import postRoute from "./post.route";

const router = express.Router();

// 기능 라우터 설정
const defaultRoutes = [
  {
    path: "",
    route: postRoute,
  },
];

// 설정한 라우터 불러오기
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
