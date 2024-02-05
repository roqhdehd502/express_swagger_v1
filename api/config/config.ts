import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    // NODE_ENV: Joi.string().valid("production", "development", "test").required(),
    PORT: Joi.number().default(4000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const port = envVars.PORT;

// 요청 횟수 제한
export const requestLimiter = rateLimit({
  windowMs: 60 * 1000, // 1분
  max: 720, // 요청 허용 횟수
  handler(req: Request, res: Response) {
    res.status(403).json({
      code: 403,
      error: "Server request count exceeded",
      message: "분당 요청량이 초과되었습니다",
    });
  },
});
