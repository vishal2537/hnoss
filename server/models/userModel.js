import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    id: { type: String },
    age: { type: String },
    gender: { type: String },
    city: { type: String },
    state: { type: String },
    phoneNumber: { type: String },
    image: { type: String },
    password: { type: String, select: true },
    profession: { type: String },
    provider: { type: String, default: "hnoss" },
    friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    matches: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

export default Users;
