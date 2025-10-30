import React from "react";
import { Search } from "lucide-react";
import UserProfileCard from "../components/UserProfileCard";
import { useNavigate } from "react-router-dom";
import "../utils/scrollBarHide.css"

function SearchPageLayout() {
  const nevigate = useNavigate();
  const arr = [
    {
      _id: 1,
      name: "kj",
      picture:
        "https://images.pexels.com/photos/33517042/pexels-photo-33517042.jpeg",
    },
    {
      _id: 2,
      name: "kj",
      picture:
        "https://images.pexels.com/photos/32523802/pexels-photo-32523802.jpeg",
    },
    {
      _id: 3,
      name: "kj",
      picture:
        "https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg",
    },
    {
      _id: 4,
      name: "kj",
      picture:
        "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg",
    },
    {
      _id: 5,
      name: "kj",
      picture:
        "https://images.pexels.com/photos/17300044/pexels-photo-17300044.jpeg",
    },
    {
      _id: 5,
      name: "kj",
      picture:
        "https://images.pexels.com/photos/17300044/pexels-photo-17300044.jpeg",
    },
    {
      _id: 5,
      name: "kj",
      picture:
        "https://images.pexels.com/photos/17300044/pexels-photo-17300044.jpeg",
    },
    {
      _id: 5,
      name: "kj",
      picture:
        "https://images.pexels.com/photos/17300044/pexels-photo-17300044.jpeg",
    },
    {
      _id: 5,
      name: "kj",
      picture:
        "https://images.pexels.com/photos/17300044/pexels-photo-17300044.jpeg",
    },
  ];
  const profileClick = (userid) => {
    nevigate(`/profile/${userid}`);
  };
  

  return (
    <div className="max-h-[85vh] bg-white flex flex-col">
      {/* SEARCH HEADING (जैसा फोटो में 'Search' दिख रहा है) */}
      <div className="px-4 mt-8">
        <h2 className="text-xl font-semibold">Search</h2>
      </div>

      {/* SEARCH BAR (फोटो के लेआउट को ज़्यादा फॉलो करने के लिए) */}
      <div className="px-4 mt-3">
        <div className="flex items-center bg-gray-100 rounded-lg p-2.5 border">
          {/* Search Icon (left) */}
          <Search color="grey" />

          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full focus:outline-none text-base placeholder-gray-500 px-3"
          />
        </div>
      </div>

      {/* RECENT SEARCHES SECTION */}
      <div className="px-4 mt-6 flex-1 flex flex-col min-h-0">
        <h3 className="text-base font-semibold mb-4">Result</h3>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {arr.length == 0 ? (
            <div className="text-center text-gray-500 text-sm">No Result</div>
          ) : (
            arr.map((item) => (
              <div key={item._id} onClick={() => profileClick(item._id)}>
                <UserProfileCard
                  username={item.name}
                  imageUrl={item.picture}
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
