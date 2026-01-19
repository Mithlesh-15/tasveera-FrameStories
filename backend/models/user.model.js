import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    profilePhoto: {
      type: String,
      default: process.env.DEFAULT_PROFILE_PIC,
    },
    bio: {
      type: String,
      default: null,
    },
    posts: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      default: [],
    },
    followers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    following: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    likedPosts: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      default: [],
    },
    canMessage: {
      type: [
        {
          friend: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          lastMessage: String,
          time: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export default User;
