import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_KEY, EXPIRES_IN_ACCESS_TOKEN, EXPIRES_IN_REFRESH_TOKEN } from "../const/jwt.const";

/**
 * JWT(Access Token)생성
 * @param{Object} payload 토큰 생성에 들어갈 객체 정보
 */
export const createAccessJWT = (payload: any) => {
  const token = jwt.sign(payload, JWT_KEY, {
    algorithm: "HS256",
    expiresIn: EXPIRES_IN_ACCESS_TOKEN,
  });
  return token;
};

/**
 * JWT(Refresh Token)생성
 */
export const createRefreshJWT = () => {
  const token = jwt.sign({}, JWT_KEY, { algorithm: "HS256", expiresIn: EXPIRES_IN_REFRESH_TOKEN });
  return token;
};

/**
 * JWT 검증
 * @param token 토큰정보
 */
export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY) as JwtPayload;
    if (!decoded) {
      return {
        status: false,
        error: "Unauthorized",
        message: "올바르지 않은 인증 요청입니다",
      };
    }

    return {
      status: true,
    };
  } catch (error: any) {
    return {
      status: false,
      error: error.message,
      message: "",
    };
  }
};

/**
 * Refresh Token 검증
 * @param token 토큰정보
 */
export const refreshVerify = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY) as JwtPayload;
    if (!decoded) {
      return {
        status: false,
        error: "Unauthorized",
        message: "올바르지 않은 인증 요청입니다",
      };
    }

    return {
      status: true,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: `${error}`,
      message: "",
    };
  }
};
