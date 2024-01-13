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
