const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const swaggerDefinition = require("./swaggerDef.ts");

const outputFile = "./swagger.json";
// path 파라미터에 해당 기능 routes 직접 지정
const routes = ["../routes/v1/post.route.ts"];

swaggerAutogen(outputFile, routes, swaggerDefinition);
