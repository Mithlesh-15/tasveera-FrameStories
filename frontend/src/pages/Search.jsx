import React from "react";
import { Search } from "lucide-react";
import UserProfileCard from "../components/UserProfileCard";
import { useNavigate } from "react-router-dom";

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
  ];
  const profileClick = (userid) => {
    nevigate(`/profile/${userid}`);
  };
  const SearchBar = () => (
    <div className="px-4 mt-6">
      <div className="flex items-center bg-gray-100 rounded-lg p-2">
        {/* Search Icon Placeholder */}
        <svg
          className="w-5 h-5 text-gray-500 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>

        <input
          type="text"
          placeholder="Search"
          className="bg-transparent w-full focus:outline-none text-sm placeholder-gray-500"
        />

        {/* Clear Button (Cross icon) - दिख नहीं रहा, पर ज़रूरी है */}
        <button className="text-gray-500 hover:text-gray-700 p-1">
          {/* Cross Icon Placeholder */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
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
      <div className="px-4 mt-6">
        <h3 className="text-base font-semibold">Result</h3>

        <div className="mt-4 text-center text-gray-500 text-sm cursor-pointer">
          {arr.length == 0
            ? "No Result"
            : arr.map((item) => (
                <div key={item._id} onClick={() => profileClick(item._id)}>
                  <UserProfileCard
                    key={item._id}
                    username={item.name}
                    imageUrl={item.picture}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPageLayout;
