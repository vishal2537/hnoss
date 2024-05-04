import mongoose, { Schema } from "mongoose";

const MessageSchema = mongoose.Schema({
    message:{
        text: { type:String, required:true }
        // you can add any other properties to the message here.
        // for example, the message can be an image ! so you need to tweak this a little
    },
    sender: { type:mongoose.Schema.Types.ObjectId, ref:'Users', required:true },
    receiver: { type:mongoose.Schema.Types.ObjectId, ref:'Users', required:true },
    created_At: { type: Date, default: Date.now() },
},
{
    timestamps: true
});


const Message = mongoose.model("Message", MessageSchema);

export default Message;