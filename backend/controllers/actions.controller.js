import mongoose from "mongoose";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

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

export const followUser = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const { profileId } = req.body;

    if (!profileId) {
      return res.status(400).json({
        success: false,
        message: "Profile ID is required",
      });
    }

    if (currentUserId === profileId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
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

    if (currentUser.following.includes(profileId)) {
      return res.status(400).json({
        success: false,
        message: "Already following this user",
      });
    }
    currentUser.following.push(profileId);
    profileUser.followers.push(currentUserId);

    await currentUser.save();
    await profileUser.save();

    return res.status(200).json({
      success: true,
      message: "Successfully followed",
      data: {
        following: currentUser.following,
        followers: profileUser.followers,
      },
    });
  } catch (error) {
    console.error("Follow error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }

    const currentUser = await User.findById(currentUserId);
    const post = await Post.findById(postId);

    if (!currentUser || !post) {
      return res.status(404).json({
        success: false,
        message: "User or Post not found",
      });
    }

    if (currentUser.likedPosts.includes(postId)) {
      return res.status(400).json({
        success: false,
        message: "Post already liked",
      });
    }

    post.likes += 1;
    currentUser.likedPosts.push(postId);

    await post.save();
    await currentUser.save();

    return res.status(200).json({
      success: true,
      message: "Successfully liked the post",
      data: {
        likes: post.likes,
        likedPosts: currentUser.likedPosts,
      },
    });
  } catch (error) {
    console.error("Like post error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const dislikePost = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }

    const currentUser = await User.findById(currentUserId);
    const post = await Post.findById(postId);

    if (!currentUser || !post) {
      return res.status(404).json({
        success: false,
        message: "User or Post not found",
      });
    }

    if (!currentUser.likedPosts.includes(postId)) {
      return res.status(400).json({
        success: false,
        message: "Post already disliked",
      });
    }

    post.likes -= 1;
    currentUser.likedPosts.push(postId);
    currentUser.likedPosts = currentUser.likedPosts.filter(
      (id) => id.toString() !== postId
    );
    await post.save();
    await currentUser.save();

    return res.status(200).json({
      success: true,
      message: "Successfully disliked the post",
      data: {
        likes: post.likes,
        likedPosts: currentUser.likedPosts,
      },
    });
  } catch (error) {
    console.error("disLike post error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
