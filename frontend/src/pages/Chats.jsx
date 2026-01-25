import React, { useEffect, useRef, useState } from "react";

import MenuBar from "../components/MenuBar";
import { ArrowLeft, Send, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { socket } from "@/utils/socket";

export default function ChatPage() {
  const nevigate = useNavigate();
  const bottomRef = useRef(null);
  const [conversationId, setConversationId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  const currentUserIdRef = useRef(currentUserId);
  const selectedConversationIdRef = useRef(conversationId);

  const formatDateTime = (isoTime) => {
    const date = new Date(isoTime);

    const time = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const day = date.getDate().toString().padStart(2, "0");

    const month = date.toLocaleString("en-IN", { month: "short" });

    const year = date.getFullYear();

    return `${time} ${day} ${month} ${year}`;
  };

  const handleSendMessage = async () => {
    if (sendMessageLoading) return;
    try {
      setSendMessageLoading(true);
      await api.post("/api/v1/chat/send-message", {
        conversationId,
        text: message,
      });
      setMessage("");
    } catch (error) {
      console.log("Message Send Error :", error);
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);

      if (status === 401) {
        toast.error("Please login first");
        nevigate("/login");
      }
    } finally {
      setSendMessageLoading(false);
    }
  };

  const handleUserClick = async (user) => {
    try {
      setMessageLoading(true);
      setSearchQuery("");
      setSelectedUser(user);
      const { data } = await api.post("/api/v1/chat/get-conversation", {
        otherUserId: user._id,
      });
      setCurrentUserId(data.currentUserId);
      setConversationId(data.conversation._id);
      selectedConversationIdRef.current = data.conversation._id;

      await api.patch(`/api/v1/chat/seen/${data.conversation._id}`);

      setFriends((prev) =>
        prev.map((conv) =>
          conv.conversationId === data.conversation._id
            ? { ...conv, unseenCount: 0 }
            : conv,
        ),
      );

      setAllMessages(data.messages);
    } catch (error) {
      console.log("User Click Error : ", error);
      setSelectedUser(null);
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);

      if (status === 401) {
        toast.error("Please login first");
        nevigate("/login");
      }
    } finally {
      setMessageLoading(false);
    }
  };

  const fetchConversations = async () => {
    try {
      setUserLoading(true);
      const response = await api.get("/api/v1/chat/get-conversations");
      setFriends(response.data.conversations);
    } catch (error) {
      console.log("Fetch Conversations Error : ", error);
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);

      if (status === 401) {
        toast.error("Please login first");
        nevigate("/login");
      } else {
        nevigate("/");
      }
    } finally {
      setUserLoading(false);
    }
  };

  const fetchCurrentUserId = async () => {
    try {
      const response = await api.get("/api/v1/get-current-user-id");
      setCurrentUserId(response.data.id);
    } catch (error) {
      console.log("Fetch User Error : ", error);
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);

      if (status === 401) {
        toast.error("Please login first");
        nevigate("/login");
      }
    }
  };

  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResult([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/api/v1/action/search?input=${searchQuery}`);

        setSearchResult(res.data.data);
      } catch (error) {
        console.log(error);
        if (error.status == 401) {
          toast.error("Please Login First");
          nevigate("/login");
        }
      }
    }, 500); // debounce delay

    return () => clearTimeout(timer);
  }, [searchQuery, nevigate]);

  useEffect(() => {
    fetchConversations();
  }, []);

  // for Sockets ----------
  useEffect(() => {
    currentUserIdRef.current = currentUserId;
  }, [currentUserId]);

  useEffect(() => {
    selectedConversationIdRef.current = conversationId;
  }, [conversationId]);

  useEffect(() => {
    fetchCurrentUserId();
    if (!currentUserId) return;

    socket.connect();
    socket.emit("join", currentUserId);

    return () => {
      socket.disconnect();
    };
  }, [currentUserId]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setAllMessages((prev) => [...prev, message]);

      setFriends((prev) => {
        if (!Array.isArray(prev)) return prev;
        const currentUserId = currentUserIdRef.current;
        const activeConversationId = selectedConversationIdRef.current;
        return prev.map((conv) => {
          if (conv.conversationId !== message.conversationId) {
            return conv;
          }

          const isReceiver =
            message.receiverId === currentUserId &&
            activeConversationId !== message.conversationId;

          const currentCount = Number(conv.unseenCount || 0);

          return {
            ...conv,
            lastMessage: {
              text: message.text,
              time: formatDateTime(message.createdAt),
              senderId: message.senderId,
            },
            unseenCount: isReceiver ? currentCount + 1 : currentCount,
          };
        });
      });
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);
  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <MenuBar />
      <div className="flex-1 lg:ml-64 flex">
        {/* Users List Section */}
        <div
          className={`${
            selectedUser ? "hidden lg:flex" : "flex"
          } lg:w-96 w-full flex-col bg-white border-r border-gray-200`}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Chats</h2>

            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* search result */}
          {searchResult.length > 0 &&
            searchResult.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user)}
                className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedUser?._id === user._id ? "bg-gray-100" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={user.profilePhoto}
                    alt={user.username}
                    className="w-14 h-14 rounded-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {user.username}
                    </h3>
                    <span className="text-xs text-gray-500">{user.time}</span>
                  </div>
                </div>
              </div>
            ))}

          <div className="flex-1 overflow-y-auto pb-20 lg:pb-4">
            {userLoading ? (
              <>
                {/* Users Skeleton */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-4">
                    {/* Avatar */}
                    <Skeleton className="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />

                    <div className="flex-1 space-y-2">
                      {/* Name */}
                      <Skeleton className="h-4 w-32 bg-gray-300 dark:bg-gray-700" />

                      {/* Last message */}
                      <Skeleton className="h-3 w-48 bg-gray-200 dark:bg-gray-600" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* Users List */}

                {friends.length > 0 &&
                  friends.map((user) => (
                    <div
                      key={user.friend._id}
                      onClick={() => handleUserClick(user.friend)}
                      className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedUser?._id === user.friend._id
                          ? "bg-gray-100"
                          : ""
                      } ${
                        user.unseenCount > 0 ? "bg-blue-50 font-semibold" : ""
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={user.friend.profilePhoto}
                          alt={user.friend.username}
                          className="w-14 h-14 rounded-full"
                        />
                        {isUserOnline(user.friend._id) && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {user.friend.username}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {user.lastMessage ? user.lastMessage.time : ""}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {user.lastMessage
                              ? user.lastMessage.text
                              : "No messages yet"}
                          </p>
                          {user.unseenCount > 0 && (
                            <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                              {user.unseenCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>

        {/* Chat Section */}
        <div
          className={`${
            selectedUser ? "flex" : "hidden lg:flex"
          } flex-1 flex-col`}
        >
          {selectedUser ? (
            <>
              {messageLoading ? (
                <>
                  {/* 🔹 Header Skeleton */}

                  <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedUser(null);
                        setConversationId(null);
                        selectedConversationIdRef.current = null;
                      }}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <Skeleton className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />

                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32 bg-gray-300" />
                      <Skeleton className="h-3 w-20 bg-gray-200" />
                    </div>
                  </div>

                  {/* 🔹 Messages Skeleton */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-16 lg:mb-0">
                    {/* Incoming */}
                    <div className="flex justify-start">
                      <Skeleton className="h-10 w-56 rounded-2xl bg-gray-200" />
                    </div>

                    {/* Outgoing */}
                    <div className="flex justify-end">
                      <Skeleton className="h-10 w-64 rounded-2xl bg-gray-300" />
                    </div>

                    {/* Incoming */}
                    <div className="flex justify-start">
                      <Skeleton className="h-10 w-40 rounded-2xl bg-gray-200" />
                    </div>

                    {/* Outgoing */}
                    <div className="flex justify-end">
                      <Skeleton className="h-10 w-52 rounded-2xl bg-gray-300" />
                    </div>

                    {/* Incoming */}
                    <div className="flex justify-start">
                      <Skeleton className="h-10 w-48 rounded-2xl bg-gray-200" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Chat Header */}
                  <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedUser(null);
                        setConversationId(null);
                        selectedConversationIdRef.current = null;
                      }}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ArrowLeft size={24} />
                    </button>

                    <div className="relative">
                      <img
                        src={selectedUser?.profilePhoto}
                        alt={selectedUser?.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      {isUserOnline(selectedUser?._id) && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {selectedUser.username}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {isUserOnline(selectedUser._id) ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
                    {allMessages?.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex ${
                          msg.senderId == currentUserId
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            msg.senderId == currentUserId
                              ? "bg-blue-500 text-white rounded-br-none"
                              : "bg-gray-200 text-gray-900 rounded-bl-none"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.senderId == currentUserId
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {formatDateTime(msg.updatedAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {/* Scroll target */}
                    <div ref={bottomRef} />
                  </div>
                </>
              )}
              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4 mb-12 lg:mb-0">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    disabled={messageLoading}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !sendMessageLoading) {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={sendMessageLoading}
                    className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Empty state for large screens
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Select a chat to start messaging
                </h3>
                <p className="text-gray-500">
                  Choose a conversation from the left sidebar
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
