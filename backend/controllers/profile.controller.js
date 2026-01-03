import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getMyProfile = (req, res) => {
  try {
    const userid = req.userId;
    return res.json({
      success: true,
      message: "User finded",
      data: userid,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};

export const getProfileDetail = async (req, res) => {
  try {
    const { profileid } = req.body;
    const profileDetail = await User.findById(profileid);
    if (!profileDetail) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }
    return res.json({
      success: true,
      message: "user found",
      data: profileDetail,
      owner: req.owner,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getPostForProfile = async (req, res) => {
  try {
    const { onePostId } = req.body;
    const postDetail = await Post.findById(onePostId);
    if (!postDetail) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }
    return res.json({
      success: true,
      message: "post found",
      data: {
        id: postDetail._id,
        image: postDetail.dataLink,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { username, bio, fullName } = req.body;

    // Find current user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If username is being updated, check uniqueness
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.json({
          success: false,
          message: "Username already taken",
        });
      }

      user.username = username;
    }

    // Update bio if provided
    if (bio !== "") {
      user.bio = bio;
    }
    if (fullName !== "") {
      user.fullName = fullName;
    }

    // Update profile photo if file exists
    if (req.file) {
      user.profilePhoto = req.file.path; // cloud URL
    }

    // Save updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        owner: userId,
        username: user.username,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
        fullname: user.fullName,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile",
    });
  }
};
