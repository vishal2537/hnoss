import mongoose, { Schema } from "mongoose";

const likedFriendSchema = new mongoose.Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "Users" },
    liked: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  }
);

const LikedFriend = mongoose.model("likedFriend", likedFriendSchema);

export default LikedFriend;
