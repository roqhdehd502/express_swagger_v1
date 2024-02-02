export const invalidError = (paramEN: string, paramKR: string, details: any[] = []) => {
  return {
    code: 400,
    error: `Invalid ${paramEN}`,
    message: `${paramKR}가 올바르지 않습니다`,
    details: details,
  };
};

export const unauthorizedError = () => {
  return {
    code: 401,
    error: "Unauthorized",
    message: "인증되지 않았습니다",
  };
};

export const accessDeniedError = (paramEN: string) => {
  return {
    code: 401,
    error: `Access denined for ${paramEN}`,
    message: "접근이 거부되었습니다",
  };
};

export const limitExceededError = (paramEN: string) => {
  return {
    code: 404,
    error: `Limit exceeded for ${paramEN}`,
    message: "더 이상 요청하실 수 없습니다",
  };
};

export const notFoundError = (paramEN: string, paramKR: string) => {
  return {
    code: 404,
    error: `Not found ${paramEN}`,
    message: `${paramKR}를 찾을 수 없습니다`,
  };
};

export const internalError = (errorMessage?: string) => {
  return {
    code: 500,
    error: `${errorMessage || "Invalid error"}`,
    message: "예기치 못한 에러입니다",
  };
};

export const serviceUnavailableError = () => {
  return {
    code: 503,
    error: "Service Unavailable",
    message: "현재 준비되지 않거나 일시적인 서버 오류입니다",
  };
};
