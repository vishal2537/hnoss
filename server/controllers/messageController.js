import Message from '../models/messageModel.js'; // Adjust the path based on your project structure
import Users from '../models/userModel.js'; // Assuming you have a Users model

export const sendMessage = async (req, res, next) => {
  const { message, sender } = req.body;
  const { id } = req.params;
  const receiverId = id;
  // console.log(message, sender, receiverId);

  try {
    if (!message) {
      return res.status(400).json({ message: "Message content is required." });
    }

    // Fetch sender and receiver information
    const senderInfo = await Users.findById(sender);
    const receiverInfo = await Users.findById(receiverId);

    if (!senderInfo || !receiverInfo) {
      return res.status(404).json({ message: "Sender or receiver not found." });
    }

    // Create and save the message
    const newMessage = new Message({
      message: {
        text: message,
      },
      sender: senderInfo._id,
      receiver: receiverInfo._id,
    });

    await newMessage.save();

    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res, next) => {
    const { userId } = req.body.user;
    const userId1 = userId;
    const { id } = req.params;
    const userId2 = id; 
  
    try {
      // Fetch user information
      const user1 = await Users.findById(userId1);
      const user2 = await Users.findById(userId2);
  
      if (!user1 || !user2) {
        return res.status(404).json({ message: "One or more users not found." });
      }
  
      // Retrieve messages between the two users
      const messages = await Message.find({
        $or: [
          { sender: user1._id, receiver: user2._id },
          { sender: user2._id, receiver: user1._id }
        ]
      }).sort({ _id: 1 });
      // }).sort({ created_At: 1 });
      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
};