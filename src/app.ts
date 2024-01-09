import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import xss from "xss-clean";
import route from "@/routes/v1";
import * as swaggerDocument from "@/swagger/swagger.json";

// dotenv 환경변수 설정
dotenv.config();

// express 기본 app 설정
const app = express();
const { PORT, MONGO_URI } = process.env;

// MongoDB 연결
mongoose
  .connect(`${MONGO_URI}`)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// XSS 설정
app.use(xss());

// gzip compression 설정
app.use(compression());

// CORS 설정
app.use(cors());
app.options("*", cors());

// v1 라우트 설정
app.use("/v1", route);

// Swagger UI 설정
app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 루트 디렉토리에 Swagger UI 문서 접근하기 위한 리다이렉션 설정
app.get("/", (req, res) => {
  res.redirect("/v1/docs");
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
