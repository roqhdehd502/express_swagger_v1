import mongoose, { Schema, Document } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { IUser } from "./user.model";

export interface IPost extends Document {
  title: string;
  content: string;
  creator: IUser;
  createdAt: Date;
  updatedAt?: Date;
}

const PostSchema: Schema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "user", autopopulate: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

PostSchema.plugin(mongooseAutoPopulate);

export default mongoose.model<IPost>("post", PostSchema);
