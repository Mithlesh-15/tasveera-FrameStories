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
    const bool = req.userId == profileid;
    return res.json({
      success: true,
      message: "user found",
      data: profileDetail,
      owner: bool,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};
