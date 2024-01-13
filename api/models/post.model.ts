import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  seq: number;
  title: string;
  content: string;
}

const PostSchema: Schema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  seq: { type: Number, required: false, default: 0 },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

PostSchema.statics.getNextSeq = async function (): Promise<number> {
  const seq = await this.findOne({}, {}, { sort: { seq: -1 } })
    .select("seq")
    .lean();
  return seq ? seq.seq + 1 : 1;
};

PostSchema.pre<IPost>("save", async function (next) {
  if (!this.seq) {
    try {
      const nextSeq = await (this.constructor as any).getNextSeq();
      this.seq = nextSeq;
      next();
    } catch (error) {
      console.log(error);
    }
  } else {
    next();
  }
});

export default mongoose.model<IPost>("Post", PostSchema);
