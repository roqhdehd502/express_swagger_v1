import { body, param, query } from "express-validator";

export const getPostListValidator = [
  query("sort")
    .optional()
    .equals("desc")
    .withMessage("sort is invalid")
    .equals("asc")
    .withMessage("sort is invalid"),
  query("limit").optional().isNumeric().withMessage("limit is invalid"),
  query("page").optional().isNumeric().withMessage("page is invalid"),
];

export const getPostValidator = [param("_id").notEmpty().withMessage("_id is required")];

export const postPostValidator = [
  body("title").notEmpty().withMessage("title is required"),
  body("content").notEmpty().withMessage("content is required"),
];

export const putPostValidator = [
  param("_id").notEmpty().withMessage("_id is required"),
  body("title").notEmpty().withMessage("title is required"),
  body("content").notEmpty().withMessage("content is required"),
];

export const deletePostValidator = [param("_id").notEmpty().withMessage("_id is required")];
