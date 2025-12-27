import jwt from "jsonwebtoken";

const isAuthorized = (req, res, next) => {
  try {
    // 1. token from cookie
    const token = req.cookies?.token;

    // 2. token missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
        redirectTo: "/login",
      });
    }

    // 3. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. attach userId to request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      redirectTo: "/login",
    });
  }
};

export default isAuthorized;
