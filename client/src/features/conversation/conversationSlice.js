import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: JSON.parse(window?.localStorage.getItem("receiver"))?.message ?? [],
  receiver:JSON.parse(window?.localStorage.getItem("receiver"))?.id ?? "",
  image:JSON.parse(window?.localStorage.getItem("receiver"))?.image ?? "",
  name:JSON.parse(window?.localStorage.getItem("receiver"))?.name ?? "",
  loading:false,
  error: false,
  sucess:true,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setMessage(state, { payload }) {
      state.messages = payload;
      const existingMessages = JSON.parse(localStorage.getItem("receiver")) || [];
      const updatedMessages = {...existingMessages, message:payload};
      localStorage.setItem("receiver", JSON.stringify(updatedMessages));
    },
    setReceiver(state, {payload}){
      console.log(payload)
      state.receiver = payload.id,
      state.name=payload.name,
      state.image=payload.image ;
      localStorage.setItem("receiver", JSON.stringify({id:payload.id,name:payload.name,image:payload.image}));
    }
    
  },
  extraReducers: (builder)=>{
  }
});

export default conversationSlice.reducer;
export const {setMessage, setReceiver} = conversationSlice.actions;