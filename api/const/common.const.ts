import dotenv from "dotenv";

// dotenv 환경변수 설정
dotenv.config();

// 현재 서버 환경 정보
export const PREV_ENV = process.env.NODE_ENV || "not found";
// API 키
export const APP_API_KEY = process.env.APP_API_KEY as string;
// 해쉬 키
export const APP_HASH_KEY = process.env.APP_HASH_KEY as string;

// 약관 정보 외부 URL
export const TERM_URL = process.env.TERM_URL as string;
// 정책 정보 외부 URL
export const POLICY_URL = process.env.POLICY_URL as string;
