import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Post, { IPost } from "../models/post.model";

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

export const getPost = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.auto = false
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 상세"
   * #swagger.description = "게시글 단 건 불러오기"
   *
   * #swagger.parameters["seq"] = { in: "path", description: "게시글 번호", type: "number", required: true }
   *
   * #swagger.responses[200] = { description: "성공시 데이터 반환", schema: { $ref: "#/components/schemas/PostVO" } }
   * #swagger.responses[400] = { description: "올바르지 않은 파라미터" }
   * #swagger.responses[404] = { description: "조회되는 데이터가 없음" }
   * #swagger.responses[500] = { description: "내부 에러" }
   */
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { seq } = req.params;
    const post: IPost = await Post.findOne({ seq: seq }).select("-_id seq title content");

    if (!post) {
      res.status(404).send("wrong url");
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
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
                      $ref: "#/components/schemas/CreatePostVO"
                  },
                  examples: {
                      example: { $ref: "#/components/examples/CreatePostVO" }
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
    const newPost: IPost = new Post({ title, content });
    await newPost.save();

    res.status(201).json({
      seq: newPost.seq,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 수정"
   * #swagger.description = "게시글 업데이트하기"
   * 
   * #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/UpdatePostVO"
                  },
                  examples: {
                      example: { $ref: "#/components/examples/UpdatePostVO" }
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
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { seq, title, content } = req.body;
    const updatedPost: IPost | null = await Post.findOneAndUpdate(
      { seq: seq },
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      res.status(404).send("wrong url");
      return;
    }

    res.status(200).json({
      seq: updatedPost.seq,
    });
  } catch (error: any) {
    console.error(error);
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 삭제"
   * #swagger.description = "게시글 삭제하기"
   *
   * #swagger.parameters["seq"] = { description: "게시글 번호", type: "number", required: true }
   *
   * #swagger.responses[204] = { description: "삭제 성공" }
   * #swagger.responses[400] = { description: "올바르지 않은 파라미터" }
   * #swagger.responses[404] = { description: "삭제할 참조 데이터가 없음" }
   */
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { seq } = req.query;
    const deletedPost = await Post.findOneAndDelete({ seq: seq });
    if (!deletedPost) {
      res.status(404).send("Post not found");
      return;
    }

    res.status(204).json(deletedPost);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error);
  }
};
