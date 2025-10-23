import React, { useState } from "react";
import { Heart, EllipsisVertical } from "lucide-react";

export default function PostCard({ data }) {
  let {
    profilePhoto,
    authorName,
    follow,
    pictureLink,
    like,
    likeCount,
    caption,
  } = data;
  const [liked, setLiked] = useState(like);
  const [followed, setFollowed] = useState(follow);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCountState(likeCountState - 1);
    } else {
      setLiked(true);
      setLikeCountState(likeCountState + 1);
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
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            <img
              src={profilePhoto}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{authorName}</span>
          </div>
          <button onClick={toggleFollow}>
            {!followed ? (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-1.5 rounded-lg transition-colors">
                <span>Follow</span>
              </button>
            ) : (
              <button className="bg-white hover:bg-gray-200 text-black border border-black font-semibold text-sm px-6 py-1.5 rounded-lg transition-colors">
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
        <div
          onDoubleClick={() => {
            if (!liked) {
              setLiked(true);
              setLikeCountState(likeCountState + 1);
            }
          }}
          className="w-full aspect-square bg-gray-100"
        >
          <img
            src={pictureLink}
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
        <p className="font-semibold text-sm">{likeCountState} likes</p>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm flex gap-2">
          <span className="font-semibold">rvcjinsta</span>
          {caption}
        </p>
      </div>
      <hr />
    </div>
  );
}
