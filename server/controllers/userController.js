import mongoose from "mongoose";
import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
// import PasswordReset from "../models/PasswordReset.js";
// import { resetPasswordLink } from "../utils/sendEmail.js";
import FriendRequest from "../models/friendRequest.js";
import LikedFriend from "../models/Liked.js";
// import MatchesFriend from "../models/Matches.js";
// import Matches from "../models/Matches.js";

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.params;
    // console.log(userId, id);

    const user = await Users.findById(id ?? userId)
      .populate({
        path: "friends",
        select: "-password",
      })
      .populate({
        path: "matches",
        select: "-password",
      });
    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }
    user.password = undefined;
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const findUsers = async (req, res) => {
  const { name } = req.query;
  try {
      // Regular expression to match the name case-insensitively
      const nameRegex = new RegExp(name, 'i');
      
      // Find users whose name matches the search query
      const users = await Users.find({ name: nameRegex });
      
      res.json({ data: users });
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { name, city, state, image, phoneNumber, profession } = req.body.data;
    const { userId } = req.body.user;
    const updateUser = {
      name,
      city,
      state,
      image,
      phoneNumber,
      profession,
      _id: userId,
    };
    const user = await Users.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });

    console.log(user)

    await user.populate({ path: "friends", select: "-password" });
    const token = createJWT(user?._id);

    user.password = undefined;

    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const friendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body.user;

    const { requestTo } = req.body;

    const requestExist = await FriendRequest.findOne({
      requestFrom: userId,
      requestTo,
    });

    if (requestExist) {
      next("Friend Request already sent.");
      return;
    }

    const accountExist = await FriendRequest.findOne({
      requestFrom: requestTo,
      requestTo: userId,
    });

    if (accountExist) {
      next("Friend Request already sent.");
      return;
    }

    const newRes = await FriendRequest.create({
      requestTo,
      requestFrom: userId,
    });

    res.status(201).json({
      success: true,
      message: "Friend Request sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const getFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body.user;

    const request = await FriendRequest.find({
      requestTo: userId,
      requestStatus: "Pending",
    })
      .populate({
        path: "requestFrom",
        select: "name image profession -password",
      })
      .limit(10)
      .sort({
        _id: -1,
      });

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const acceptRequest = async (req, res, next) => {
  try {
    const id = req.body.user.userId;

    const { rid, status } = req.body;

    const requestExist = await FriendRequest.findById(rid);

    if (!requestExist) {
      next("No Friend Request Found.");
      return;
    }

    const newRes = await FriendRequest.findByIdAndUpdate(
      { _id: rid },
      { requestStatus: status }
    );

    if (status === "Accepted") {
      const user = await Users.findById(id);

      user.friends.push(newRes?.requestFrom);

      await user.save();

      const friend = await Users.findById(newRes?.requestFrom);

      friend.friends.push(newRes?.requestTo);

      await friend.save();
    }

    res.status(201).json({
      success: true,
      message: "Friend Request " + status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const profileViews = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.body;

    const user = await Users.findById(id);

    user.views.push(userId);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const suggestedFriends = async (req, res) => {
  try {
    const { userId } = req.body.user;

    let queryObject = {};
    queryObject._id = { $ne: userId };
    queryObject.friends = { $nin: userId };

    let queryResult = Users.find(queryObject)
      .limit(15)
      .select("name image profession -password");

    const suggestedFriends = await queryResult;

    res.status(200).json({
      success: true,
      data: suggestedFriends,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const suggestADate = async (req, res) => {
  try {
    const { userId } = req.body.user;

    // Fetch user details to determine gender
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const gender = user.gender;
    const likedData = await LikedFriend.findOne({ userid: userId });

    // Determine the gender to suggest based on the current user's gender
    const suggestedGender = gender === "male" ? "female" : "male";

    if (likedData) {
      // Filter out 15 users which do not have the same id as present in likedData.liked array and have the suggested gender
      const users = await Users.find({
        $and: [
          { _id: { $nin: likedData.liked } }, // Users with ids not present in likedData.liked array
          { gender: suggestedGender }, // Users with the suggested gender
        ],
      }).limit(15);

      return res.status(200).json({
        success: true,
        data: users,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getLiked = async (req, res) => {
  try {
    const userid = req.body.user.userId;
    const data = await LikedFriend.findOne({ userid: userid });

    if (!data) {
      const ndata = { userid: userid, liked: [] };
      const newLikedFriend = new LikedFriend(ndata);

      // Save the new document to the database
      await newLikedFriend.save();

      // Return a response indicating success
      return res.status(200).json({
        success: true,
        message: "New liked document created",
        data: newLikedFriend,
      });
    }

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const findADate = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const { requestTo } = req.body;

    // Add requestTo id to current user's liked array
    let data = await LikedFriend.findOne({ userid: userId });
    if (!data) {
      // If user data not found, create a new document
      data = new LikedFriend({ userid: userId, liked: [requestTo] });
    } else {
      if (!data.liked.includes(requestTo)) {
        data.liked.push(requestTo);
      }
    }
    await data.save();

    // Check if there's a match
    const requestedUser = await LikedFriend.findOne({ userid: requestTo });

    if (requestedUser && requestedUser.liked.includes(userId)) {
      const user = await Users.findById(userId);
      user.friends.push(requestTo);
      user.matches.push(requestTo);
      await user.save();

      const user1 = await Users.findById(requestTo);
      user1.matches.push(userId);
      user1.friends.push(userId);
      await user1.save();
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const unFriend = async (req, res, next) => {
  try {
    const userId = req.body.user.userId;
    const friendId = req.body.friendId;

    // Remove friendId from userId's friend list
    await Users.findByIdAndUpdate(userId, {
      $pull: { friends: friendId }
    });

    // Remove friendId from userId's friend list
    await Users.findByIdAndUpdate(userId, {
      $pull: { matches: friendId }
    });

    // Remove userId from friendId's friend list
    await Users.findByIdAndUpdate(friendId, {
      $pull: { friends: userId }
    });
    
    // Remove friend request entry
     await FriendRequest.findOneAndDelete({
      $or: [
        { requestTo: userId, requestFrom: friendId },
        { requestTo: friendId, requestFrom: userId }
      ]
    });

     await Users.findByIdAndUpdate(friendId, {
       $pull: { matches: userId },
     });

    res.status(200).json({
      success: true,
      message: "Successfully unfriended."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};
