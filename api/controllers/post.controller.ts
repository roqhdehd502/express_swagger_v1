import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { invalidError, notFoundError, internalError } from "../errors";
import Post, { IPost } from "../models/post.model";
import { formattedDate } from "../utils/date.util";
import { isNaturalNumber } from "../utils/regex_test.util";

export const getPostList = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.auto = false
   * 
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 목록"
   * #swagger.description = "게시글 목록 데이터 불러오기"
   *
   * #swagger.parameters["sort"] = { description: "정렬 순서(desc, asc), 기본값은 desc", type: "string" }
   * #swagger.parameters["limit"] = { description: "불러올 공지사항 수, 기본값은 10", type: "number" }
   * #swagger.parameters["page"] = { description: "불러올 페이지 넘버, 기본값은 1", type: "number" }
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
   * #swagger.responses[400] = { description: "올바르지 않은 파라미터" }
   * #swagger.responses[500] = { description: "내부 에러" }
   */
  try {
    const errors = validationResult(req);
    const { sort, limit, page } = req.query;
    const customSort = !sort ? "desc" : (sort as string);
    const customLimit = !limit ? 10 : Number(limit);
    const customPage = !page ? 1 : Number(page);
    if (customSort !== "asc" && customSort !== "desc") {
      throw new Error(`400,sort,정렬 순서,${errors.array()}`);
    }
    if (!isNaturalNumber(customLimit)) {
      throw new Error(`400,limit,불러올 공지사항 수,${errors.array()}`);
    }
    if (!isNaturalNumber(customPage)) {
      throw new Error(`400,page,불러올 페이지 넘버,${errors.array()}`);
    }

    const posts: IPost[] = await Post.find()
      .sort({ createdAt: customSort === "asc" ? 1 : -1 })
      .skip((customPage - 1) * customLimit)
      .limit(customLimit);
    const convertPosts = posts.map((item) => {
      return {
        _id: item._id.toString(),
        title: item.title,
        content: item.content,
        createdAt: formattedDate(item.createdAt as Date),
        updatedAt: item.updatedAt ? formattedDate(item.updatedAt as Date) : "",
      };
    });

    res.status(200).json([...convertPosts]);
  } catch (error: any) {
    const errors = error.message.split(",");
    switch (errors[0]) {
      case "400":
        res.status(400).json(invalidError(errors[1], errors[2], errors[3]));
        break;
      default:
        res.status(500).json(internalError(error.message));
    }
  }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.auto = false
   *
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 상세"
   * #swagger.description = "게시글 단 건 불러오기"
   *
   * #swagger.parameters["_id"] = { in: "path", description: "게시글 고유 번호", type: "string", required: true }
   *
   * #swagger.responses[200] = { description: "성공시 데이터 반환", schema: { $ref: "#/components/schemas/PostVO" } }
   * #swagger.responses[400] = { description: "올바르지 않은 파라미터" }
   * #swagger.responses[404] = { description: "조회되는 데이터가 없음" }
   * #swagger.responses[500] = { description: "내부 에러" }
   */
  try {
    const errors = validationResult(req);

    const { _id } = req.params;
    if (!_id) {
      throw new Error(`400,_id,게시글 고유 번호,${errors.array()}`);
    }

    const post: IPost | null = await Post.findById({ _id });
    if (!post) {
      throw new Error("404,Post,게시글");
    }

    res.status(200).json({
      _id: post._id.toString(),
      title: post.title,
      content: post.content,
      createdAt: formattedDate(post.createdAt as Date),
      updatedAt: post.updatedAt ? formattedDate(post.updatedAt as Date) : "",
    });
  } catch (error: any) {
    const errors = error.message.split(",");
    switch (errors[0]) {
      case "400":
        res.status(400).json(invalidError(errors[1], errors[2], errors[3]));
        break;
      case "404":
        res.status(404).json(notFoundError(errors[1], errors[2]));
        break;
      default:
        res.status(500).json(internalError(error.message));
    }
  }
};

export const postPost = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 작성"
   * #swagger.description = "게시글 생성하기"
   * 
   * #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/PostPostVO"
                  },
                  examples: {
                      example: { $ref: "#/components/examples/PostPostVO" }
                  }
              }
          }
      }   
   * 
   * #swagger.responses[201] = { description: "작성 성공" }
   * #swagger.responses[400] = { description: "올바르지 않은 파라미터" }
   * #swagger.responses[500] = { description: "내부 에러" }
   */
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { title, content } = req.body;
    if (!title) {
      throw new Error(`400,title,제목,${errors.array()}`);
    }
    if (!content) {
      throw new Error(`400,content,내용,${errors.array()}`);
    }

    const newPost: IPost = new Post({ title, content });
    await newPost.save();

    res.status(201).json({
      status: "ok",
    });
  } catch (error: any) {
    const errors = error.message.split(",");
    switch (errors[0]) {
      case "400":
        res.status(400).json(invalidError(errors[1], errors[2], errors[3]));
        break;
      default:
        res.status(500).json(internalError(error.message));
    }
  }
};

export const putPost = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.auto = false
   * 
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 수정"
   * #swagger.description = "게시글 업데이트하기"
   * 
   * #swagger.parameters["_id"] = { in: "path", description: "게시글 고유 번호", type: "string", required: true }
   * #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/PutPostVO"
                  },
                  examples: {
                      example: { $ref: "#/components/examples/PutPostVO" }
                  }
              }
          }
      }
   * 
   * #swagger.responses[200] = { description: "수정 성공" }
   * #swagger.responses[400] = { description: "올바르지 않은 파라미터" }
   * #swagger.responses[404] = { description: "수정할 참조 데이터가 없음" }
   * #swagger.responses[500] = { description: "내부 에러" }
   */
  try {
    const errors = validationResult(req);

    const { _id } = req.params;
    if (!_id) {
      throw new Error(`400,_id,게시글 고유 번호,${errors.array()}`);
    }

    const { title, content } = req.body;
    if (!title) {
      throw new Error(`400,title,제목,${errors.array()}`);
    }
    if (!content) {
      throw new Error(`400,content,내용,${errors.array()}`);
    }

    const updatedPost: IPost | null = await Post.findByIdAndUpdate(
      { _id },
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      throw new Error("404,Post,게시글");
    }

    res.status(200).json({
      status: "ok",
    });
  } catch (error: any) {
    const errors = error.message.split(",");
    switch (errors[0]) {
      case "400":
        res.status(400).json(invalidError(errors[1], errors[2], errors[3]));
        break;
      case "404":
        res.status(404).json(notFoundError(errors[1], errors[2]));
        break;
      default:
        res.status(500).json(internalError(error.message));
    }
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.auto = false
   *
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 삭제"
   * #swagger.description = "게시글 삭제하기"
   *
   * #swagger.parameters["_id"] = { in: "path", description: "게시글 고유 번호", type: "string", required: true }
   *
   * #swagger.responses[204] = { description: "삭제 성공" }
   * #swagger.responses[400] = { description: "올바르지 않은 파라미터" }
   * #swagger.responses[404] = { description: "삭제할 참조 데이터가 없음" }
   */
  try {
    const errors = validationResult(req);

    const { _id } = req.params;
    if (!_id) {
      throw new Error(`400,_id,게시글 고유 번호,${errors.array()}`);
    }

    const deletedPost = await Post.findByIdAndDelete({ _id });
    if (!deletedPost) {
      throw new Error("404,Post,게시글");
    }

    res.status(204).json({
      status: "ok",
    });
  } catch (error: any) {
    const errors = error.message.split(",");
    switch (errors[0]) {
      case "400":
        res.status(400).json(invalidError(errors[1], errors[2], errors[3]));
        break;
      case "404":
        res.status(404).json(notFoundError(errors[1], errors[2]));
        break;
      default:
        res.status(500).json(internalError(error.message));
    }
  }
};
