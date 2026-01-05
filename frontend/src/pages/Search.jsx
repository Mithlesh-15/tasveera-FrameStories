import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import UserProfileCard from "../components/UserProfileCard";
import "../utils/scrollBarHide.css";

function SearchPageLayout() {
  const nevigate = useNavigate();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const profileClick = (userid) => {
    nevigate(`/profile/${userid}`);
  };

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(`/api/v1/action/search?input=${query}`);
        setUsers(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }, 500); // debounce delay

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-h-[85vh] bg-white flex flex-col">
      {/* SEARCH HEADING  */}
      <div className="px-4 mt-8">
        <h2 className="text-xl font-semibold">Search</h2>
      </div>

      {/* SEARCH BAR */}
      <div className="px-4 mt-3">
        <div className="flex items-center bg-gray-100 rounded-lg p-2.5 border">
          {/* Search Icon (left) */}
          <Search color="grey" />

          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent w-full focus:outline-none text-base placeholder-gray-500 px-3"
          />
        </div>
      </div>

      {/* RECENT SEARCHES SECTION */}
      <div className="px-4 mt-6 flex-1 flex flex-col min-h-0">
        <h3 className="text-base font-semibold mb-4">Result</h3>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {users.length == 0 ? (
            <div className="text-center text-gray-500 text-sm ">No Result</div>
          ) : (
            users.map((item) => (
              <div
                key={item._id}
                onClick={() => profileClick(item._id)}
                className="cursor-pointer"
              >
                <UserProfileCard
                  username={item.username}
                  imageUrl={item.profilePhoto}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPageLayout;
