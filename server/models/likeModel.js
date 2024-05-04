import mongoose, { Schema } from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    post: { type: Schema.Types.ObjectId, ref: "Posts" },
  },
  { timestamps: true }
);

const Likes = mongoose.model("Likes", likeSchema);

export default Likes;