import axios from "axios";
export const API_URL = "http://localhost:8800";
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

export const getMessages = async (data) => {
    const {token, sender, receiver} = data;
    try {
      const res = await apiRequest({
        url: "/messages/get-messages/" + receiver,
        token: token,
        data:{
            userId1: sender,
        },
        method: "GET",
      });
      return res;
    } catch (error) {
      console.log(error);
    }
}; 

export const sendMessage = async (data) => {
    const {token, sender, receiver, message} = data;
    try {
      const res = await apiRequest({
        url: "/messages/send-message/" + receiver,
        token: token,
        data: {
          message: message,
          sender: sender,
        },
        method: "POST",
      });
      return res?.data;
    } catch (error) {
      console.log(error);
    }
};
