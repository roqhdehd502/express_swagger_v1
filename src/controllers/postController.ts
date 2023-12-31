import { Request, Response } from "express";
import Post, { IPost } from "../models/postModel";

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: IPost[] = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

// TODO: 다른 CRUD 메소드들도 유사한 방식으로 작성할 것
