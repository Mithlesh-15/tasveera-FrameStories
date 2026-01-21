import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getOrCreateConversation = async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const currentUserId = req.userId;

    if (!currentUserId || !otherUserId) {
      return res.status(400).json({
        message: "Both user IDs are required",
      });
    }
    if (currentUserId.toString() === otherUserId.toString()) {
      return res.status(400).json({
        message: "You cannot create conversation with yourself",
      });
    }

    // ✅ Ensure ObjectId format
    const userIds = [
      new mongoose.Types.ObjectId(currentUserId),
      new mongoose.Types.ObjectId(otherUserId),
    ];

    // ✅ Find existing conversation between both users
    let conversation = await Conversation.findOne({
      participants: { $all: userIds },
    })
      .populate("participants", "name email")
      .populate("lastMessage");

    // ✅ If not found → create new conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: userIds,
      });

      conversation = await conversation.populate("participants", "name email");
    }

    // ✅ Get friend (remove current user)
    const friend = conversation.participants.find(
      (user) => user._id.toString() !== currentUserId,
    );

    // ✅ Fetch messages
    const messages = await Message.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: 1 })
      .limit(20);

    return res.status(200).json({
      conversation,
      friend,
      messages,
    });
  } catch (error) {
    console.error("getOrCreateConversation error:", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
