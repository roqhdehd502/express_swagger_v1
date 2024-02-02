import dotenv from "dotenv";

// dotenv 환경변수 설정
dotenv.config();

// JWT 키
export const JWT_KEY = process.env.JWT_SECRET_KEY as string;

// 토큰 만료 시간
export const EXPIRES_IN_ACCESS_TOKEN = "10m" as string; // 10분
export const EXPIRES_IN_REFRESH_TOKEN = "14d" as string; // 14일
