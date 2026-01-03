import Post from "../models/post.model.js";
import User from "../models/user.model.js";

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

    // create post in DB
    const post = await Post.create({
      owner: req.userId,
      dataLink: mediaUrl,
      type: req.body.type,
      caption: req.body.caption || "",
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
    console.log(req.followed)
    return res.status(200).json({
      success: true,
      data: {
        id: post.owner._id,
        profilePhoto: post.owner.profilePhoto,
        authorName: post.owner.username,
        follow: false,
        fileLink: post.dataLink,
        like: false,
        likeCount: 0,
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
