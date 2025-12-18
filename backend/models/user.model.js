import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    profilePhoto: {
      type: String,
      default: process.env.DEFAULT_PROFILE_PIC,
    },
    bio: {
      type: String,
      default: null,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
