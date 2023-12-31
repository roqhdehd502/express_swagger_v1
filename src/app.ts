import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";
import postRoutes from "./routes/postRoutes";

dotenv.config();

const app = express();
const { PORT, MONGO_URI } = process.env;

// MongoDB 연결
mongoose
  .connect(`${MONGO_URI}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS 설정
app.use(cors());

// 라우트 설정
app.use("/api", postRoutes);

// Swagger UI 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
