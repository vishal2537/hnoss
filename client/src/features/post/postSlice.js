import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts(state, {payload}) {
      state.posts = payload;
    },
    SetPosts(state, {payload}){
      state.posts = payload
    }
  },
});

export default postSlice.reducer;
export const {getPosts, SetPosts} = postSlice.actions;