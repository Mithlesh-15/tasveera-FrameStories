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
        owner:req.userId,
        dataLink:mediaUrl,
        type:req.body.type,
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
