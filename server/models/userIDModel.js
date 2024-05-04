import mongoose, { Schema } from "mongoose";

const UserIDSchema = new mongoose.Schema(
  {
    id: { type: Schema.Types.ObjectId, ref:"Users"},
    
  },
  { timestamps: true }
);

const UserIDs = mongoose.model("UserIDs", UserIDSchema);

export default UserIDs;
