import React, { useState } from "react";
import { Heart, MessageCircle, Bookmark, Grid, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logout from "../utils/logout";

export default function InstagramProfile() {
  const [owner, setOwner] = useState(true);
  const [following, setFollowing] = useState(false);

  const handleFollow = () => setFollowing(!following);

  const posts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop",
      likes: "45.2K",
      comments: "892",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=400&fit=crop",
      likes: "52.8K",
      comments: "1.2K",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400&h=400&fit=crop",
      likes: "38.9K",
      comments: "756",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=400&fit=crop",
      likes: "41.3K",
      comments: "643",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop",
      likes: "49.7K",
      comments: "981",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400&h=400&fit=crop",
      likes: "44.1K",
      comments: "834",
    },
  ];

 

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Info */}
        <div className="flex gap-8 mb-8">
          {/* Profile Picture */}
          <div className="shrink-0">
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-linear-to-tr from-cyan-600 via-blue-600 to-violet-600 p-1">
              <div className="w-full h-full rounded-full bg-white p-1">
                <img
                  src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=200&h=200&fit=crop"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-4">
              {/* Username and Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg md:text-xl font-normal">
                  sportskeedacricket
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {owner ? (
                  <>
                    <Link to="/update-profile" className="flex-1 bg-gray-200 hover:bg-blue-200 text-black font-semibold py-2 px-4 rounded-lg transition text-sm text-center">
                      Edit Profile
                    </Link>
                    <button className="flex-1 bg-gray-200 hover:bg-red-300 text-red-500 font-semibold py-2 px-4 rounded-lg transition text-sm" onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleFollow}
                      className={`flex-1 font-semibold py-2 px-4 rounded-lg transition text-sm ${
                        following
                          ? "bg-gray-200 hover:bg-gray-300 text-black"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      {following ? "Following" : "Follow"}
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition">
                  <User className="w-5 h-5" />
                </button>
                  </>
                )}
                
              </div>

              {/* Stats - Desktop */}
              <div className="hidden md:flex gap-8">
                <div>
                  <span className="font-semibold">88,245</span> posts
                </div>
                <div>
                  <span className="font-semibold">1M</span> followers
                </div>
                <div>
                  <span className="font-semibold">455</span> following
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Mobile */}
        <div className="md:hidden border-t border-b py-3 mb-4">
          <div className="flex justify-around text-center">
            <div>
              <div className="font-semibold">88,245</div>
              <div className="text-gray-500 text-sm">posts</div>
            </div>
            <div>
              <div className="font-semibold">1M</div>
              <div className="text-gray-500 text-sm">followers</div>
            </div>
            <div>
              <div className="font-semibold">455</div>
              <div className="text-gray-500 text-sm">following</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h3 className="font-semibold mb-1">Sportskeeda Cricket</h3>
          <p className="text-sm">
            Download CricRocket for fastest cricket live scores & updates 🏏
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-4 mt-1">
          {posts.map((post) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className="relative aspect-square group cursor-pointer"
            >
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
