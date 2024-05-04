import express from "express";
import path from "path";
import {
  acceptRequest,
  findADate,
  friendRequest,
  getFriendRequest,
  getUser,
  profileViews,
  suggestADate,
  suggestedFriends,
  updateUser,
  findUsers,
  getLiked,
  unFriend
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

// user routes
router.post("/get-user/:id?", userAuth, getUser);
router.get("/get-user/:id?", userAuth, getUser);
router.get("/find-users/search", userAuth, findUsers);
router.put("/update-user", userAuth, updateUser);

// friend request
router.post("/friend-request", userAuth, friendRequest);
router.post("/get-friend-request", userAuth, getFriendRequest);
router.post("/findADate", userAuth, findADate);

// accept / deny friend request
router.post("/accept-request", userAuth, acceptRequest);
router.post("/unfriend", userAuth, unFriend);


// view profile
router.post("/profile-view", userAuth, profileViews);

//suggested friends
router.post("/suggested-friends", userAuth, suggestedFriends);
router.get("/suggested-dates", userAuth, suggestADate);
router.get("/liked", userAuth, getLiked);

export default router;
