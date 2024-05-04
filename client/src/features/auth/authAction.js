import axios from "axios";
export const API_URL = "http://localhost:8800";

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getGoogleSignUp = createAsyncThunk("auth/google-signup", async (accessToken) => {
  try {
    const user = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data);
    if (user?.sub) {
      const data = {
        name: user.name,
        email: user.email,
        emailVerified: user.email_verified,
        image: user.picture,
      };
      const result = await axios.post(`${API_URL}/auth/google-signup`, data);

      return result?.data;
    }
  } catch (error) {
    const err = error?.response?.data || error?.response;
    console.log(error);
    return err;
  }
}
);

export const googleSignin = createAsyncThunk("auth/loginjhh", async (token) => {
  try {
    const user = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
    if (user?.sub) {
      const data = {
        email: user.email,
      };
      const result = await axios.post(`${API_URL}/auth/login`, data);
      return result?.data;
    }
  } catch (error) {
    const err = error?.response?.data || error?.response;
    console.log(error);
    return err;
  }
}
);

export const emailSignUp = createAsyncThunk("auth/register",async (data) => {
  try {
    const result = await axios.post(`${API_URL}/auth/register`, data);
    return result?.data;
  } catch (error) {
    const err = error?.response?.data || error?.response;
    window.alert("Invalid email or password. Sign Up again...");
    return err;
  }
}
);

export const emailLogin = createAsyncThunk("auth/login",async (data) => {
  try {
    const result = await axios.post(`${API_URL}/auth/login`, data);
    return result?.data;
  } catch (error) {
    const err = error?.response?.data || error?.response;
    window.alert("Invalid email or password. Login again...");
    return err;
  }
}
);