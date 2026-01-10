import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWTandCookieSetUp = (res, userId) => {
  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const signup = async (req, res) => {
  try {
    const { email, fullName, username, password } = req.body;

    // Validation
    if (!email || !fullName || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check existing user by email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }

    // Check existing user by username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exist",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: process.env.DEFAULT_PROFILE_PIC,
    });

    await newUser.save();
    JWTandCookieSetUp(res, newUser._id);

    // Send response (exclude password)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    JWTandCookieSetUp(res, user._id);

    // Send response (exclude password)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later",
    });
  }
};

export const AuthProvider = async (req, res) => {
  try {
    const { email, fullName, username, profilePhoto } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    // If user exists - LOGIN
    if (user) {
      JWTandCookieSetUp(res, user._id);

      // Send response
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          email: user.email,
          fullName: user.fullName,
          username: user.username,
          profilePhoto: user.profilePhoto,
        },
      });
    }

    // If user doesn't exist - SIGNUP

    // Create new user
    const newUser = new User({
      email,
      fullName,
      username,
      profilePhoto: profilePhoto || null,
    });

    await newUser.save();
    JWTandCookieSetUp(res, newUser._id);

    // Send response
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      isNewUser: true,
      user: {
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePhoto: newUser.profilePhoto,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later",
    });
  }
};
