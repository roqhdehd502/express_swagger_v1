import { Request, Response } from "express";
import Post, { IPost } from "@/models/post.model";

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 목록"
   * #swagger.description = "게시글 목록 불러오기"
   * #swagger.responses[200] = {
   *    description: "성공적으로 가져온 게시글 목록",
   *    schema: {
   *      type: "array",
   *      items: {
   *        $ref: "#/definitions/Post" // 게시글 스키마를 정의한 부분을 여기에 넣어주세요.
   *      }
   *    }
   * }
   * #swagger.responses[500] = {
   *    description: "서버 오류"
   * }
   */
  try {
    const posts: IPost[] = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export const getPost = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 상세"
   * #swagger.description = "게시글 단 건 불러오기"
   * #swagger.parameters["PostId"] = {
   *    in: "path",
   *    description: "게시글의 ID",
   *    required: true,
   *    type: "string"
   * }
   * #swagger.responses[200] = {
   *    description: "성공적으로 가져온 게시글",
   *    schema: {
   *      $ref: "#/definitions/Post" // 게시글 스키마를 정의한 부분을 여기에 넣어주세요.
   *    }
   * }
   * #swagger.responses[404] = {
   *    description: "게시글을 찾을 수 없음"
   * }
   * #swagger.responses[500] = {
   *    description: "서버 오류"
   * }
   */
  try {
    const seq = req.params.seq;
    const post: IPost | null = await Post.findById(seq);
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
   * #swagger.summary = "게시글 생성"
   * #swagger.description = "게시글 생성"
   * #swagger.parameters["CreatePostData"] = {
   *    in: "body",
   *    description: "게시글을 생성하기 위한 데이터",
   *    required: true,
   *    schema: {
   *      $ref: "#/definitions/NewPost" // 새로운 게시글의 스키마를 정의한 부분을 여기에 넣어주세요.
   *    }
   * }
   * #swagger.responses[201] = {
   *    description: "성공적으로 생성된 게시글",
   *    schema: {
   *      $ref: "#/definitions/Post" // 생성된 게시글의 스키마를 정의한 부분을 여기에 넣어주세요.
   *    }
   * }
   * #swagger.responses[500] = {
   *    description: "서버 오류"
   * }
   */
  try {
    const { title, content } = req.body;
    const newPost: IPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error);
  }
};
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 수정"
   * #swagger.description = "게시글 수정"
   * #swagger.parameters["PostId"] = {
   *    in: "path",
   *    description: "게시글의 ID",
   *    required: true,
   *    type: "string"
   * }
   * #swagger.parameters["UpdatePostData"] = {
   *    in: "body",
   *    description: "게시글을 수정하기 위한 데이터",
   *    required: true,
   *    schema: {
   *      $ref: "#/definitions/UpdatePost" // 수정된 게시글의 스키마를 정의한 부분을 여기에 넣어주세요.
   *    }
   * }
   * #swagger.responses[200] = {
   *    description: "성공적으로 수정된 게시글",
   *    schema: {
   *      $ref: "#/definitions/Post" // 수정된 게시글의 스키마를 정의한 부분을 여기에 넣어주세요.
   *    }
   * }
   * #swagger.responses[404] = {
   *    description: "게시글을 찾을 수 없음"
   * }
   * #swagger.responses[500] = {
   *    description: "서버 오류"
   * }
   */
  try {
    const seq = req.params.seq;
    const { title, content } = req.body;
    const updatedPost: IPost | null = await Post.findByIdAndUpdate(
      seq,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      res.status(404).send("wrong url");
      return;
    }
    res.status(200).json(updatedPost);
  } catch (error: any) {
    console.error(error);
  }
};
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  /**
   * #swagger.tags = ["post"]
   * #swagger.summary = "게시글 삭제"
   * #swagger.description = "게시글 삭제"
   * #swagger.parameters["PostId"] = {
   *    in: "path",
   *    description: "게시글의 ID",
   *    required: true,
   *    type: "string"
   * }
   * #swagger.responses[204] = {
   *    description: "성공적으로 삭제된 게시글"
   * }
   * #swagger.responses[404] = {
   *    description: "게시글을 찾을 수 없음"
   * }
   * #swagger.responses[500] = {
   *    description: "서버 오류"
   * }
   */
  try {
    const seq = req.params.seq;
    const deletedPost = await Post.findByIdAndDelete(seq);
    if (!deletedPost) {
      res.status(404).send("wrong url");
      return;
    }
    res.status(204).json(deletedPost);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error);
  }
};
