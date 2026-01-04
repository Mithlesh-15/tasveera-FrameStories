import mongoose from "mongoose";
import User from "../models/user.model.js";

export const unfollowUser = async (req, res) => {
  try {
    const currentUserId = req.userId; // Get current logged-in user ID
    const { profileId } = req.body; // Get the profile ID to unfollow
    // Validate profileId
    if (!profileId) {
      return res.status(400).json({
        success: false,
        message: "Profile ID is required",
      });
    }

    // Prevent self-unfollow
    if (currentUserId === profileId) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself",
      });
    }

    const currentUser = await User.findById(currentUserId);
    const profileUser = await User.findById(profileId);

    if (!currentUser || !profileUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== profileId
    );

    profileUser.followers = profileUser.followers.filter(
      (id) => id.toString() !== currentUserId
    );

    await currentUser.save();
    await profileUser.save();

    

    return res.status(200).json({
      success: true,
      message: "Successfully unfollowed",
      data: {
        following: currentUser.following,
        followers: profileUser.followers,
      },
    });
  } catch (error) {
    console.error("Unfollow error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
