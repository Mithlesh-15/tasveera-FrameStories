import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { io } from "../socket/socket.js";



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

    return res.status(200).json({
      conversation,
      currentUserId,
      messages,
    });
  } catch (error) {
    console.error("getOrCreateConversation error:", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const { conversationId, text } = req.body;

    // Validate required fields
    if (!conversationId || !text?.trim()) {
      return res.status(400).json({
        message: "ConversationId and message text are required",
      });
    }

    // Check if conversation exists
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    // Get receiver id (exclude current sender from participants)
    const receiverId = conversation.participants.find(
      (id) => id.toString() !== senderId.toString(),
    );

    if (!receiverId) {
      return res.status(400).json({
        message: "Receiver not found in conversation",
      });
    }

    // Create new message
    const message = await Message.create({
      conversationId,
      senderId,
      receiverId,
      text,
      seen: false,
    });

    // Update conversation lastMessage and push message into TotalMessages
    conversation.lastMessage = message._id;
    conversation.TotalMessages.push(message._id);
    await conversation.save();

    // Emit realtime message to sender and receiver (enable when socket is ready)
    io.to(senderId.toString()).emit("newMessage", message);
    io.to(receiverId.toString()).emit("newMessage", message);

    res.status(201).json({
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMyConversations = async (req, res) => {
  try {
    const currentUserId = req.userId;

    if (!currentUserId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    // Find all conversations where current user is a participant
    const conversations = await Conversation.find({
      participants: currentUserId,
    })
      .populate("participants", "username profilePhoto")
      .populate("lastMessage", "text createdAt senderId")
      .populate("TotalMessages", "receiverId seen")
      .sort({ updatedAt: -1 });

    // Map conversations to required frontend format
    const formattedConversations = conversations.map((conv) => {
      const friend = conv.participants.find(
        (user) => user._id.toString() !== currentUserId.toString(),
      );
      const unseenCount = conv.TotalMessages.filter(
        (msg) =>
          msg.receiverId?.toString() === currentUserId.toString() &&
          msg.seen === false,
      ).length;

      return {
        conversationId: conv._id,
        friend: {
          _id: friend?._id,
          username: friend?.username,
          profilePhoto: friend?.profilePhoto,
        },
        lastMessage: conv.lastMessage
          ? {
              text: conv.lastMessage.text,
              time: conv.lastMessage.createdAt,
              senderId: conv.lastMessage.senderId,
            }
          : null,
        unseenCount,
        updatedAt: conv.updatedAt,
      };
    });

    res.status(200).json({
      count: formattedConversations.length,
      conversations: formattedConversations,
    });
  } catch (error) {
    console.error("Get My Conversations Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const markMessagesSeen = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({
        message: "ConversationId required",
      });
    }

    await Message.updateMany(
      {
        conversationId,
        receiverId: currentUserId,
        seen: false,
      },
      {
        $set: { seen: true },
      },
    );

    res.status(200).json({
      message: "Messages marked as seen",
    });
  } catch (error) {
    console.error("Mark Seen Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};