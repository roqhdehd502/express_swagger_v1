import { body, param, query } from "express-validator";
import { isNumericString } from "../utils/regex";

export const createPostValidator = [
  body("title").notEmpty().withMessage("title is required"),
  body("content").notEmpty().withMessage("content is required"),
];

export const updatePostValidator = [
  body("seq")
    .notEmpty()
    .withMessage("seq is required")
    .isNumeric()
    .withMessage("seq must be a number"),
  body("title").notEmpty().withMessage("title is required"),
  body("content").notEmpty().withMessage("content is required"),
];

export const getPostValidator = [
  param("seq")
    .notEmpty()
    .withMessage("seq is required")
    .custom(isNumericString)
    .withMessage("seq must be a numeric string"),
];

export const deletePostValidator = [
  query("seq")
    .notEmpty()
    .withMessage("seq is required")
    .isNumeric()
    .withMessage("seq must be a number"),
];
