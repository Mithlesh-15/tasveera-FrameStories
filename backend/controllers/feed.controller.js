import Post from "../models/post.model.js";

export const getImageFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const posts = await Post.find({
      type: "image", // 🔥 sirf image posts
    })
      .populate("owner", "username profilePhoto")
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit)
      .lean();
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("getImageFeed error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
