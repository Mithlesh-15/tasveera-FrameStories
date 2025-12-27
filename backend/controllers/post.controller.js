import Post from "../models/post.model.js";
import jwt from "jsonwebtoken";

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

    // extract token from cookie
    const token = req.cookies.token;

    // cheak token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }
    // token verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.userId;
    // create post in DB
    const post = await Post.create({
        owner,
        dataLink:mediaUrl,
        type:req.body.type,
        caption: req.body.caption || "",
    });

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
