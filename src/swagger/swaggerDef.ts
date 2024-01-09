const dotenv = require("dotenv");
const { version } = require("../../package.json");

// dotenv 환경변수 설정
dotenv.config();

const { PORT } = process.env;
const swaggerDef = {
  info: {
    version: version,
    title: "템플릿 API",
    description: "템플릿 API 명세",
  },
  servers: [
    {
      url: `http://localhost:${PORT}/v1`,
      description: "테스트계",
    },
  ],
  definitions: {
    PostVO: {
      type: "object",
      properties: {
        seq: {
          type: "integer",
          description: "게시글 번호",
        },
        title: {
          type: "string",
          description: "게시글 제목",
        },
        content: {
          type: "string",
          description: "게시글 내용",
        },
      },
    },
  },
};

module.exports = swaggerDef;
