import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import postSlice from "./features/post/postSlice";
import conversationSlice from "./features/conversation/conversationSlice";
import likedSlice from "./features/liked/likedSlice";
export const store = configureStore({
  reducer: {
    user: authSlice,
    posts: postSlice,
    conversations: conversationSlice,
    liked: likedSlice,
  },
});
