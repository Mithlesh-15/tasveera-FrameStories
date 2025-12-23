import React, { useEffect, useState } from "react";
import {
  Home,
  Search,
  Film,
  PlusSquare,
  Menu,
  MessageCircleQuestionMark,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logout from "../utils/logout";

export default function MenuBar() {
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  const [strokeWidth, setStrokeWidth] = useState({
    home: 2,
    search: 2,
    videos: 2,
    create: 2,
    profile: 2,
  });

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
      strokeWidth: "home",
    },
    {
      icon: Search,
      label: "Search",
      path: "/search",
      strokeWidth: "search",
    },
    {
      icon: Film,
      label: "Videos",
      path: "/videos",
      strokeWidth: "videos",
    },
    {
      icon: PlusSquare,
      label: "Create",
      path: "/create",
      strokeWidth: "create",
    },
  ];

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setStrokeWidth({
        home: 3,
        search: 2,
        videos: 2,
        create: 2,
        profile: 2,
      });
    } else if (path === "/search") {
      setStrokeWidth({
        home: 2,
        search: 3,
        videos: 2,
        create: 2,
        profile: 2,
      });
    } else if (path === "/videos") {
      setStrokeWidth({
        home: 2,
        search: 2,
        videos: 3,
        create: 2,
        profile: 2,
      });
    } else if (path === "/create") {
      setStrokeWidth({
        home: 2,
        search: 2,
        videos: 2,
        create: 3,
        profile: 2,
      });
    } else if (path.startsWith("/profile")) {
      setStrokeWidth({
        home: 2,
        search: 2,
        videos: 2,
        create: 2,
        profile: 3,
      });
    }
  }, [location.pathname]);

  return (
    <>
      {/* Sidebar Navigation - Hidden on mobile, visible on lg screens */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1
            className="text-2xl font-semibold px-3 py-4"
            style={{ fontFamily: "cursive" }}
          >
            Tasveera
          </h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <div className="relative">
                <item.icon
                  size={24}
                  strokeWidth={strokeWidth[item.strokeWidth]}
                />
              </div>
              <span className="text-base font-normal">{item.label}</span>
            </NavLink>
          ))}

          <NavLink
            to="/profile/0"
            className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <User size={24} strokeWidth={strokeWidth.profile} />
            <span className="text-base font-normal">Profile</span>
          </NavLink>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="relative">
            <button
              onClick={() => setShowLogout(!showLogout)}
              className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Menu size={24} strokeWidth={2} />
              <span className="text-base font-normal">More</span>
            </button>

            {/* Logout Dropdown */}
            {showLogout && (
              <div
                onClick={logout}
                className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                <button className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <LogOut size={24} strokeWidth={2} className="text-red-500" />
                  <span className="text-base font-normal text-red-500">
                    Log out
                  </span>
                </button>
              </div>
            )}
          </div>

          <button className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors mt-2">
            <MessageCircleQuestionMark size={24} strokeWidth={2} />
            <span className="text-base font-normal">Help</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation - Visible on mobile, hidden on lg screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <nav className="flex items-center justify-between">
          <NavLink
            to="/"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Home size={28} strokeWidth={strokeWidth.home} />
          </NavLink>

          <NavLink
            to="/search"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Search size={28} strokeWidth={strokeWidth.search} />
          </NavLink>

          <NavLink
            to="/videos"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Film size={28} strokeWidth={strokeWidth.videos} />
          </NavLink>

          <NavLink
            to="/create"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <PlusSquare size={28} strokeWidth={strokeWidth.create} />
          </NavLink>

          <NavLink
            to="/profile/0"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <User size={28} strokeWidth={strokeWidth.profile} />
          </NavLink>
        </nav>
      </div>
    </>
  );
}
