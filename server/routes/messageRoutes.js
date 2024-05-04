import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";
const router = express.Router();

// get posts
router.get("/get-messages/:id", userAuth, getMessages);

// crete post
router.post("/send-message/:id", userAuth, sendMessage);

export default router;
