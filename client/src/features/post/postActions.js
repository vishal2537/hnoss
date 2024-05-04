import axios from "axios";
export const API_URL = "http://localhost:8800";
import { SetPosts } from "./postSlice";
export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result?.data;
  } catch (error) {
    const err = error.response.data;
    return { status: err.success, message: err.message };
  }
};

export const fetchPosts = async (token, dispatch, uri, data) => {
  try {
    const res = await apiRequest({
      url: uri || "/posts",
      token: token,
      method: "POST",
      data: data || {},
    });
    dispatch(SetPosts(res?.data));
    return;
  } catch (error) {
    console.log(error);
  }
};
export const fetchUserPosts = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "posts/get-user-post/" + id,
      token: token,
      method: "POST",
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async ({ uri, token }) => {
  try {
    const res = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id, token) => {
  try {
    await apiRequest({
      url: "/posts/" + id,
      token: token,
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (token, id) => {
  try {
    const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;
    const res = await apiRequest({
      url: uri,
      token: token,
      method: "GET",
    });
    if (res.message === "Authentication failed") {
      // localStorage.removeItem("user");
      // window.alert("User session expired. Login again.");
      // window.location.replace("/sign-in");
    }
    return res?.user;
  } catch (error) {
    console.log(error);
  }
};

export const getDateSuggestions = async (token, id) => {
  try {
    const uri = "/users/suggested-dates";
    const res = await apiRequest({
      url: uri,
      token: token,
      data: {},
      method: "GET",
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const findADate = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "/users/findADate",
      token: token,
      method: "POST",
      data: { requestTo: id },
    });
    
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const sendFriendRequest = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "/users/friend-request",
      token: token,
      method: "POST",
      data: { requestTo: id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const unFriend = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "/users/unfriend",
      token: token,
      method: "POST",
      data: { friendId: id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const viewUserProfile = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "/users/profile-view",
      token: token,
      method: "POST",
      data: { id },
    });
  } catch (error) {
    console.log(error);
  }
};


export const findUsers = async (token, name ) => {
  console.log(name);
  try {
    console.log(name);
    const res = await apiRequest({
      url: `users/find-users/search?name=${name}`,
      token: token,
      method: "GET",
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};


export const updateUser = async (token, data) => {
  try {
    const res = await apiRequest({
      url: `users/update-user`,
      token: token,
      method: "PUT",
      data:{data}
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};