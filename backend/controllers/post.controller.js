import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinaryConfig.js";

export const createPost = async (req, res) => {
  try {
    // file check
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File not received",
      });
    }

    // cloudinary data
    const mediaUrl = req.file.path;

    const publicId = req.file.filename; // cloudinary public_id
    const isVideo = req.file.mimetype.startsWith("video");
    // default thumbnail (image case)
    let thumbnail = mediaUrl;

    // generate thumbnail for video
    if (isVideo) {
      thumbnail = cloudinary.url(publicId, {
        resource_type: "video",
        format: "jpg",
        transformation: [
          { start_offset: "1" }, // 1 second frame
        ],
      });
    }

    // create post in DB
    const post = await Post.create({
      owner: req.userId,
      dataLink: mediaUrl,
      type: req.body.type,
      caption: req.body.caption || "",
      thumbnail
    });

    //  push post id into user.posts
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { posts: post._id } },
      { new: true }
    );

    // success response
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.error("Create Post Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const showOnePost = async (req, res) => {
  try {
    const { postid } = req.body;

    if (!postid) {
      return res.status(400).json({
        success: false,
        message: "Post Id not received",
      });
    }

    const post = await Post.findById(postid).populate(
      "owner",
      "username profilePhoto"
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        id: post.owner._id,
        profilePhoto: post.owner.profilePhoto,
        authorName: post.owner.username,
        follow: false,
        fileLink: post.dataLink,
        like: false,
        likeCount: post.likes,
        caption: post.caption,
        fileType: post.type,
        owner: req.owner,
      },
    });
  } catch (error) {
    console.error("Show One Post Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const givingInfo = (req, res) => {
  return res.json({
    like: req.like,
    followed: req.followed,
    owner: req.owner,
  });
};
