import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isOwner: {
      type: Boolean,
      default: true,
    },

    dataLink: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },

    caption: {
      type: String,
      default: "",
      maxlength: 50,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
