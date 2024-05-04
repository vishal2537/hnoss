import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  userid: null,
  liked: null,
  matched: null,
  error: null,
};

export const getLiked = createAsyncThunk(
  "liked/getLiked",
  async ({ token }, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:8800/users/liked", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMatched = createAsyncThunk(
  "matched",
  async ({ token }, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:8800/users/matched", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });   
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLiked.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLiked.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.userid = payload.data.userid;
          state.liked = payload.data.liked;
        } else {
          state.error = "Invalid payload format";
        }
      })
      .addCase(getLiked.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getMatched.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMatched.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.userid = payload.data.userid;
          state.matched = payload.data.matched;
        } else {
          state.error = "Invalid payload format";
        }
      })
      .addCase(getMatched.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default likedSlice.reducer;
