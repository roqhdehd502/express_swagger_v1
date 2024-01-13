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
