import { createSlice } from "@reduxjs/toolkit";
import { setSidebarOpen, getSidebarOpen } from "../localStorage";
import {
  getGoogleSignUp,
  googleSignin,
  emailLogin,
  emailSignUp,
} from "./authAction";

const initialState = {
  // user: null,
  user: JSON.parse(window?.localStorage.getItem("user"))?.user ?? null,
  token: JSON.parse(window?.localStorage.getItem("user"))?.token ?? null,
  id: JSON.parse(window?.localStorage.getItem("user"))?.user?._id ?? null,
  // token:JSON.parse(window?.localStorage.getItem("user").token) ?? null,
  edit: false,
  loading: false,
  loader: false,
  error: false,
  sucess: false,
  sidebarOpen: getSidebarOpen(), // Initialize sidebarOpen from localStorage
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      localStorage?.removeItem("user");
      localStorage?.removeItem("receiver");
      state.user = null;
      state.loading = false;
      state.token = null;
      state.sucess = false;
    },
    register(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateProfile(state, action) {
      state.edit = action.payload;
    },
    load(state) {
      state.loader = true;
    },
    loaded(state) {
      state.loader = false;
    },
    addlikes(state, action) {
      state.user.liked = action.payload;
    },
    toggleSidebar(state) {
      const newSidebarOpen = !state.sidebarOpen;
      state.sidebarOpen = newSidebarOpen;
      setSidebarOpen(newSidebarOpen); // Set sidebarOpen in localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoogleSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGoogleSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.sucess = true;
        state.user = payload;
        // console.log(payload);
      })
      .addCase(getGoogleSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(googleSignin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.userToken;
      })
      .addCase(googleSignin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(emailSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emailSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload?.user;
        state.token = payload?.token;
        state.sucess = true;
        localStorage.setItem("user", JSON.stringify(payload));
        // console.log(payload);
      })
      .addCase(emailSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(emailLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emailLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload?.user;
        state.token = payload?.token;
        state.id = payload?._id;
        state.sucess = true;
        localStorage.setItem("user", JSON.stringify(payload));
      })
      .addCase(emailLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default authSlice.reducer;

export const {
  login,
  logout,
  register,
  updateProfile,
  load,
  loaded,
  addlikes,
  toggleSidebar,
} = authSlice.actions;

// import { createSlice } from "@reduxjs/toolkit";
// import {getGoogleSignUp, googleSignin, emailLogin, emailSignUp} from "./authAction";

// const initialState = {
//   // user: null,
//   user: JSON.parse(window?.localStorage.getItem("user"))?.user ?? null,
//   token: JSON.parse(window?.localStorage.getItem("user"))?.token ?? null,
//   id: JSON.parse(window?.localStorage.getItem("user"))?.user?._id ?? null,
//   // token:JSON.parse(window?.localStorage.getItem("user").token) ?? null,
//   edit: false,
//   loading:false,
//   loader:false,
//   error:false,
//   sucess: false

// };

// const authSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     login(state, action) {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     logout(state) {
//       localStorage?.removeItem("user");
//       localStorage?.removeItem("receiver");
//       state.user = null;
//       state.loading=false;
//       state.token=null;
//       state.sucess=false;
//     },
//     register(state, action) {
//         state.user = action.payload;
//         localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     updateProfile(state, action) {
//       state.edit = action.payload;
//     },
//     load(state){
//       state.loader=true;
//     },
//     loaded(state){
//       state.loader=false;
//     },
//     addlikes(state,action) {
//       state.user.liked = action.payload;
//     }
//   },
//   extraReducers: (builder)=>
//   {
//     builder
//     .addCase(getGoogleSignUp.pending, (state)=>{
//       state.loading = true
//       state.error = null
//     })
//     .addCase(getGoogleSignUp.fulfilled, (state,{payload})=>{
//       state.loading = false
//       state.sucess = true
//       state.user=payload
//       // console.log(payload);

//     })
//     .addCase(getGoogleSignUp.rejected, (state, {payload})=>{
//       state.loading = false
//       state.error = payload
//     })
//     .addCase(googleSignin.pending, (state)=>{
//       state.loading = true
//       state.error = null
//     })
//     .addCase(googleSignin.fulfilled, (state,{payload})=>{
//       state.loading = false
//       state.userInfo = payload
//       state.userToken = payload.userToken

//     })
//     .addCase(googleSignin.rejected, (state, {payload})=>{
//       state.loading = false
//       state.error = payload
//     })
//     .addCase(emailSignUp.pending, (state)=>{
//       state.loading = true
//       state.error = null
//     })
//     .addCase(emailSignUp.fulfilled, (state,{payload})=>{
//       state.loading = false
//       state.user=payload?.user
//       state.token=payload?.token
//       state.sucess = true
//       localStorage.setItem("user", JSON.stringify(payload));
//       // console.log(payload);
//     })
//     .addCase(emailSignUp.rejected, (state, {payload})=>{
//       state.loading = false
//       state.error = payload
//     })
//     .addCase(emailLogin.pending, (state)=>{
//       state.loading = true
//       state.error = null
//     })
//     .addCase(emailLogin.fulfilled, (state,{payload})=>{
//       state.loading = false
//       state.user = payload?.user
//       state.token = payload?.token
//       state.id = payload?._id
//       state.sucess = true
//       localStorage.setItem("user", JSON.stringify(payload));
//     })
//     .addCase(emailLogin.rejected, (state, {payload})=>{
//       state.loading = false
//       state.error = payload

//     })

//   },
// });
// export default authSlice.reducer;

// export const{login, logout, register, updateProfile, load, loaded, addlikes} = authSlice.actions;
