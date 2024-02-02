# Express Swagger V1

Express 기반으로 제작된 API 템플릿 입니다.
Express.js, Typescript, Swagger, MongoDB 등이 적용되어 있습니다.

## 구성

현재 템플릿에서는 다음과 같은 라이브러리가 적용되어 있습니다.

```json
"dependencies": {
  "axios": "^1.6.5",
  "compression": "^1.7.4",                        | 데이터 압축 라이브러리
  "cors": "^2.8.5",                               | CORS 처리 라이브러리
  "dayjs": "^1.11.10",                            | day.js 날짜 처리 라이브러리
  "dotenv": "^16.3.1",                            | env 환경 변수 적용 라이브러리
  "express": "^4.18.2",                           | express.js
  "express-rate-limit": "^7.1.5",                 | express.js api call 제한 라이브러리
  "express-validator": "^7.0.1",                  | express 검증 확인 라이브러리
  "form-data": "^4.0.0",                          | form 데이터 라이브러리
  "joi": "^17.11.0",                              | 검증 확인 라이브러리
  "jsonwebtoken": "^9.0.2",                       | jwt 라이브러리
  "mongoose": "^8.0.3",                           | mongo db ORM 라이브러리
  "mongoose-autopopulate": "^1.1.0",              | mongoose populate 자동화 라이브러리
  "morgan": "^1.10.0",                            | 서버 로그 라이브러리
  "multiparty": "^4.2.3",                         | multiparty 라이브러리
  "node-cron": "^3.0.3",                          | cron 스케쥴링 라이브러리
  "request-ip": "^3.3.0",                         | 요청자 IP 확인 라이브러리
  "swagger-autogen": "^2.23.7",                   | swagger 자동 변환 라이브러리
  "swagger-cli": "^4.0.4",                        | swagger 로그 라이브러리
  "swagger-jsdoc": "^6.2.8",                      | swagger jsdoc 문서처리
  "swagger-ui-express": "^4.6.3",                 | swagger ui 라이브러리
  "xss-clean": "^0.1.4"                           | xss 방지 라이브러리
},
"devDependencies": {
  "@types/compression": "^1.7.5",                 | compression 타입스크립트 적용
  "@types/cors": "^2.8.17",                       | cors 타입스크립트 적용
  "@types/express": "^4.17.21",                   | express 타입스크립트 적용
  "@types/jsonwebtoken": "^9.0.5",                | jsonwebtoken 타입스크립트 적용
  "@types/morgan": "^1.9.9",                      | morgan 타입스크립트 적용
  "@types/multiparty": "^0.0.36",                 | multiparty 타입스크립트 적용
  "@types/node": "^20.10.5",                      | node.js 타입스크립트 적용
  "@types/node-cron": "^3.0.11",                  | node-cron 타입스크립트 적용
  "@types/request-ip": "^0.0.41",                 | request-ip 타입스크립트 적용
  "@types/swagger-jsdoc": "^6.0.4",               | swagger-jsdo 타입스크립트 적용
  "@types/swagger-ui-express": "^4.1.6",          | swagger-ui-express
  "@typescript-eslint/eslint-plugin": "^6.16.0",  | eslint 타입스크립트 적용
  "@typescript-eslint/parser": "^6.16.0",
  "eslint": "^8.56.0",                            | eslint
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-prettier": "^5.1.2",
  "nodemon": "^3.0.2",                            | nodemon
  "prettier": "^3.1.1",                           | prettier
  "ts-node": "^10.9.2",
  "tsconfig-paths": "^4.2.0",                     | typescript config
  "typescript": "^5.3.3"                          | typescript
}
```

## 설치

2023년 09월 11일, [Node 16버전](https://nodejs.org/en/blog/announcements/nodejs16-eol)의 지원이 중단(End-of-Life) 되었습니다.  
따라서, 로컬에 기본적으로 18버전 이상의 node.js가 설치되어 있어야합니다.

패키지 설치하기

```bash
npm i
```

환경 변수를 설정합니다. 아래 커맨드로 .env.example을 복사하여 .env 파일을 복사하여 만들어 줍니다.

```bash
cp .env.example .env
```

.env를 개발 환경에 맞게 수정해줍니다.

## 실행

### swagger.json 파일 자동 변환

참고: swaggerDef.ts 파일 내에서 작업을 완료한 다음, 앱 실행 전 진행하여 swagger.json 파일이 변경되었는지 확인해야 합니다.

```bash
npm run gen-swagger
```

### 앱 실행

```bash
npm run dev
```

## 구조

```
├── api                             | api 디렉토리
│   ├── components                  | swagger components 스키마 설정 디렉토리
│   ├── config                      | 설정 디렉토리
│   ├── const                       | 고정값 디렉토리
│   ├── controllers                 | mongo DB 컨트롤러 디렉토리
│   ├── errors                      | 에러 핸들링 디렉토리
│   ├── middlewares                 | express.js 미들웨어 디렉토리
│   ├── models                      | mongo DB 모델 디렉토리
│   ├── routes/v1                   | express.js 라우팅 디렉토리 (v1)
│   ├── swagger                     | swagger 관련 자동화 파일 및 json 문서 디렉토리
│   ├── utils                       | 공용 기능 디렉토리
│   └── validators                  | 검증 디렉토리
├── .env.example                    | 환경변수 예제 파일
├── .eslintrc.json                  | eslint 설정 파일
├── .gitignore                      | git 커밋 무시 설정
├── .prettierrc.json                | prettier 설정 파일
├── index.ts                        | express.js 메인 실행 파일
├── package.json                    | package.json
├── README.md
├── tsconfig.json                   | 타입스크립트 설정 파일
├── vercel.json                     | vercel 배포 설정 파일 (필요 없을시 삭제)
└── xss-clean.d.ts                  | xss-clean 라이브러리 타입스크립트 설정 파일
```

## 가이드

### route

mongo DB controller 및 model 로직 구현을 완료 후.
routes/v1 디렉토리 내에 원하는 라우트 경로를 지정합니다.

참고: swagger 자동변환 이슈로 인해, 공통 url (ex. /post/\*)을 해당 파일에 지정해야 합니다.

```ts
import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../../controllers/post.controller";

const router = express.Router();

router.get("/post/query", getAllPosts);
router.get("/post/query/detail", getPost);
router.post("/post/command", createPost);
router.put("/post/command", updatePost);
router.delete("/post/command", deletePost);

export default router;
```

index.ts 파일에 지정한 라우트를 추기합니다.

```ts
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
```

### swagger autogen 자동변환 적용

swagger 자동변환을 적용하기 위해 swagger/index.ts 파일 내에 다음과 같이 route 경로를 추가합니다.

```ts
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const swaggerDefinition = require("./swaggerDef.ts");

const outputFile = "./swagger.json";
// path 파라미터에 해당 기능 routes 직접 지정
const routes = ["../routes/v1/*.ts"];
// const routes = ["../routes/v1/post.route.ts"];

swaggerAutogen(outputFile, routes, swaggerDefinition);
```

이 후 터미널에서 다음과 같은 명령어로 swagger.json 자동변환을 진행합니다.

```bash
npm run gen-swagger
```

### swagger 자동 변환

swagger-autogen 라이브러리는 작성한 route 및 controller의 로직을 기반으로 swagger 문서를 자동화를 합니다.

기본적인 설정 로직은 아래의 swaggerDef.ts와 같습니다.

```ts
const { version } = require("../../package.json");
const config = require("../config/config.ts");
const definitions = require("../definitions/index.ts");

const swaggerDef = {
  info: {
    version: version,
    title: "템플릿 API",
    description: "템플릿 API 명세",
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: "로컬계",
    },
  ],
  components: {
    ...components,
  },
};

module.exports = swaggerDef;
```

### swagger components 설정

api 열람 확인시 필요한 스키마 정보를 지정하기 위해 components/\* 경로 내에 다음과 같이 지정합니다.

```ts
// post.schema.ts
module.exports = {
  PostVO: {
    seq: 0,
    title: "제목",
    content: "내용",
  },
  CreatePostVO: {
    $title: "제목",
    $content: "내용",
  },
  UpdatePostVO: {
    $seq: 0,
    $title: "제목",
    $content: "내용",
  },
};
```

```ts
// post.example.ts
module.exports = {
  CreatePostVO: {
    value: { title: "제목", content: "내용" },
    summary: "작성할 게시글 객체",
  },
  UpdatePostVO: {
    value: { seq: 0, title: "제목", content: "내용" },
    summary: "수정할 게시글 객체",
  },
};
```

이 후 components/index.ts에서 작성한 schemas와 examples를 적용합니다.

```ts
const postExamples = require("./post.example.ts");
const postSchemas = require("./post.schema.ts");

module.exports = {
  schemas: {
    ...postSchemas,
  },
  examples: {
    ...postExamples,
  },
};
```

적용한 components는 swagger/swaggerDef.ts 파일에서 확인할 수 있습니다.

```ts
const { version } = require("../../package.json");
const config = require("../config/config.ts");
const components = require("../components/index.ts");

const swaggerDef = {
  info: {
    version: version,
    title: "템플릿 API",
    description: "템플릿 API 명세",
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: "로컬계",
    },
  ],
  components: {
    ...components,
  },
};

module.exports = swaggerDef;
```

### swagger-autogen 세부 설정

tags, summary, description 설정은 controller 파일에 다음과 같이 주석으로 지정합니다.

```ts
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 목록"
   * #swagger.description = "게시글 목록 데이터 불러오기"
   *
   * #swagger.responses[200] = {
            description: "성공시 데이터 반환",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/PostVO"
                        }
                    }
                }           
            }
        } 
   * #swagger.responses[500] = { description: "내부 에러" }
   */
  try {
    const posts: IPost[] = await Post.find().select("-_id seq title content");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
```

기타 자세한 사용법은 [swagger-autogen](https://swagger-autogen.github.io/docs) 문서를 참고하세요.
