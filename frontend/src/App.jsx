import React, { useEffect, useState } from "react";
import MenuBar from "./components/MenuBar";
import { Outlet } from "react-router-dom";
import "./utils/scrollBarHide.css";
import api from "./api/axios";
import { socket } from "./utils/socket";

function App() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const fetchCurrentUserId = async () => {
    try {
      const response = await api.get("/api/v1/get-current-user-id");
      setCurrentUserId(response.data.id);
    } catch (error) {
      console.log("Fetch User Error : ", error);
    }
  };
  useEffect(() => {
    fetchCurrentUserId();
    if (!currentUserId) return;

    socket.connect();
    socket.emit("join", currentUserId);

    return () => {
      socket.disconnect();
    };
  }, [currentUserId]);
  return (
    <>
      <div className="min-h-screen bg-gray-50 scrollbar-hide">
        <MenuBar />
        {/* Main Content Area */}
        <div className="lg:ml-64 h-screen p-4 pb-20 lg:pb-4 overflow-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
