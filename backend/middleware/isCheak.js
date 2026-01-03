import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const ExtractUseIdFromPost = async (req) => {
  if (req.body.PostId) {
    const post = await Post.findById(req.body.PostId).select("owner");

    if (!post) {
      return null;
    }
    return post.owner;
  }
};
const givingUserId = async (req) => {
  const givenId = req.body?.profileid || (await ExtractUseIdFromPost(req));
  return givenId;
};
export const isOwner = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    const givenId = await givingUserId(req);

    if (!givenId) {
      return res.status(400).json({
        success: false,
        message: "Resource id not provided",
      });
    }

    req.owner = String(givenId) === String(req.userId);
    next();
  } catch (error) {
    console.error("isOwner middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const isFollowed = async (req, res, next) => {
  try {
    if (req.owner) {
      req.followed = false;
      return next();
    }

    const user = await User.findById(req.userId).select("following");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const givenId = await givingUserId(req);
    if (!givenId) {
      req.followed = false;
      return next();
    }

    req.followed = user.following
      .map((id) => String(id))
      .includes(String(givenId));
    next();
  } catch (error) {
    console.error("isFollowed middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const isLike = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("likedPosts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const postId = req.body?.PostId;

    if (!postId) {
      req.like = false;
      return next();
    }

    req.like = user.likedPosts.map((id) => String(id)).includes(String(postId));
    next();
  } catch (error) {
    console.error("isLike middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
