import express from "express";
import authRoute from "./authRoute.js";
import postRoute from "./postRoutes.js";
import userRoute from "./userRoutes.js";
import messageRoute from "./messageRoutes.js";

const router = express.Router();
router.use("/auth", authRoute);
router.use("/posts", postRoute);
router.use("/users", userRoute);
router.use("/messages", messageRoute);

export default router;