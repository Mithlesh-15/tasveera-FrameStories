const isOwner = (req, res, next) => {
  try {
    const givenId = req.body.profileid || req.body.postid;
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

export default isOwner;
