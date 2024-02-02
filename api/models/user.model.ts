import mongoose, { Schema, Document } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

export interface IUser extends Document {
  phone: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

UserSchema.plugin(mongooseAutoPopulate);

export default mongoose.model<IUser>("user", UserSchema);
