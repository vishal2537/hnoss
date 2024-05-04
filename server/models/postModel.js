// import mongoose, { Schema } from "mongoose";

// const postSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     // slug: { type: String, unique: true },
//     desc: { type: String },
//     img: { type: String },
//     // cat: { type: String },
//     likes: [{ type: Schema.Types.ObjectId, ref: "Likes" }],
//     user: { type: Schema.Types.ObjectId, ref: "Users" },
//     comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],

//     // status: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// const Posts = mongoose.model("Posts", postSchema);

// export default Posts;

import mongoose, { Schema } from "mongoose";

//schema
const postSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    description: { type: String, required: true },
    image: { type: String },
    likes: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;