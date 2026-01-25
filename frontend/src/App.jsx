import React, { useEffect, useState } from "react";
import MenuBar from "./components/MenuBar";
import { Outlet, useNavigate } from "react-router-dom";
import "./utils/scrollBarHide.css";
import api from "./api/axios";
import toast from "react-hot-toast";
import { socket } from "./utils/socket";

function App() {
  const nevigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(null);
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
