import React, { useState } from "react";

import MenuBar from "../components/MenuBar";
import {
  ArrowLeft,
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";

// Dummy data for users
const dummyUsers = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    lastMessage: "Hey! Kaise ho?",
    time: "2:30 PM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Priya Singh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    lastMessage: "Photo bhej dena",
    time: "1:15 PM",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Amit Kumar",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    lastMessage: "Thanks bro!",
    time: "12:45 PM",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: "Sneha Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    lastMessage: "Kal milte hain",
    time: "11:20 AM",
    unread: 1,
    online: false,
  },
  {
    id: 5,
    name: "Vikram Mehta",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    lastMessage: "Okay done!",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
];

// Dummy messages
const dummyMessages = {
  1: [
    { id: 1, text: "Hey! Kaise ho?", sent: false, time: "2:25 PM" },
    { id: 2, text: "Main theek hoon, tum batao", sent: true, time: "2:26 PM" },
    { id: 3, text: "Bas sab badhiya hai", sent: false, time: "2:28 PM" },
    { id: 4, text: "Aaj kya plan hai?", sent: false, time: "2:30 PM" },
  ],
  2: [{ id: 1, text: "Photo bhej dena", sent: false, time: "1:15 PM" }],
  3: [
    { id: 1, text: "Ye file chahiye thi", sent: true, time: "12:40 PM" },
    { id: 2, text: "Thanks bro!", sent: false, time: "12:45 PM" },
  ],
  4: [{ id: 1, text: "Kal milte hain", sent: false, time: "11:20 AM" }],
  5: [
    { id: 1, text: "Wo kaam ho gaya?", sent: true, time: "Yesterday" },
    { id: 2, text: "Okay done!", sent: false, time: "Yesterday" },
  ],
};

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would add the message to your state/backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <MenuBar />
      {/* Menubar space - lg:ml-64 for large screens */}
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

          {/* Users List */}
          <div className="flex-1 overflow-y-auto pb-20 lg:pb-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedUser?.id === user.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-full"
                  />
                  {user.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {user.name}
                    </h3>
                    <span className="text-xs text-gray-500">{user.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {user.lastMessage}
                    </p>
                    {user.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                        {user.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft size={24} />
                </button>

                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {selectedUser.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedUser.online ? "Online" : "Offline"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Phone size={20} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Video size={20} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-16 lg:mb-0">
                {dummyMessages[selectedUser.id]?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        msg.sent
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sent ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
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
