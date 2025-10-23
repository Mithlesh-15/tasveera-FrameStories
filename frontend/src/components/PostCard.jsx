import React, { useState } from "react";
import { Heart, EllipsisVertical } from "lucide-react";

export default function PostCard() {
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(false);
  const toggleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  };
  const toggleFollow = () => {
    if (followed) {
      setFollowed(false);
    } else {
      setFollowed(true);
    }
  };
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
  {/* Header */}

  <div className="flex items-center justify-between p-4 border-b">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">RVCJ</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">rvcjinsta</span>
      </div>
      <button onClick={toggleFollow}>
        {!followed ? (
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-1.5 rounded-lg transition-colors">
            <span>Follow</span>
          </button>
        ) : (
          <button className="bg-white hover:bg-gray-200 text-black border-1 border-black font-semibold text-sm px-6 py-1.5 rounded-lg transition-colors">
            <span>Unfollow</span>
          </button>
        )}
      </button>
    </div>
    <div className="flex items-center gap-3">
      <button className="text-gray-600">
        <EllipsisVertical />
      </button>
    </div>
  </div>

  {/* Content */}
  <div className="bg-white">
    {/* Image */}
    <div onDoubleClick={() => setLiked(true)} className="w-full aspect-square bg-gray-100">
      <img
        src="https://images.pexels.com/photos/33334086/pexels-photo-33334086.jpeg"
        alt="Post"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex items-center gap-5 p-4">
    <div className="flex gap-4">
      <button onClick={toggleLike} className="hover:text-gray-600">
        {liked ? (
          <Heart size={30} color="red" fill="red" />
        ) : (
          <Heart size={30} />
        )}
      </button>
    </div>
    <p className="font-semibold text-sm">26,579 likes</p>
  </div>

  {/* Caption */}
  <div className="px-4 pb-4">
    <p className="text-sm">
      <span className="font-semibold">rvcjinsta</span> On This Day In 2022,
      Ravi Ashwin pulled this off....{" "}
    </p>
  </div>
  <hr />
</div>
  );
}
