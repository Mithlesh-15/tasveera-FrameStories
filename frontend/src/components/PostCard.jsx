import React, { useRef, useState } from "react";
import { Heart, EllipsisVertical } from "lucide-react";

export default function PostCard({ data }) {
  let {
    profilePhoto,
    authorName,
    follow,
    fileLink,
    like,
    likeCount,
    caption,
    fileType,
  } = data;
  const videoref = useRef(null);
  const [liked, setLiked] = useState(like);
  const [pause, setPause] = useState(false);
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
  const togglePause = () =>{
    if(fileType === "image") return;
    if(pause){
      videoref.current.play()
      setPause(false);
    }
    else{
      videoref.current.pause()
      setPause(true)
    }
  }
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0">
            <img
              src={profilePhoto}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="font-semibold text-xs sm:text-sm truncate">
            {authorName}
          </span>

          <button onClick={toggleFollow} className="ml-auto shrink-0">
            {!followed ? (
              <span className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm px-3 sm:px-6 py-1 sm:py-1.5 rounded-lg transition-colors inline-block">
                Follow
              </span>
            ) : (
              <span className="bg-white hover:bg-gray-200 text-black border border-black font-semibold text-xs sm:text-sm px-3 sm:px-6 py-1 sm:py-1.5 rounded-lg transition-colors inline-block">
                Unfollow
              </span>
            )}
          </button>
        </div>
        <button className="text-gray-600 ml-2 shrink-0">
          <EllipsisVertical className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="bg-white">
        {/* Image/Video - 16:9 Aspect Ratio */}
        <div
          onDoubleClick={() => {
            if (!liked) {
              setLiked(true);
              setLikeCountState(likeCountState + 1);
            }
          }}
          onClick={togglePause}
          className="w-full bg-gray-100"
          style={
            fileType === "video"
              ? { aspectRatio: "16/9" }
              : { aspectRatio: "1/1" }
          }
        >
          {fileType === "video" ? (
            <video
              src={fileLink}
              ref={videoref}
              autoPlay
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={fileLink}
              alt="Post"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 sm:gap-5 p-3 sm:p-4">
        <button onClick={toggleLike} className="hover:text-gray-600 shrink-0">
          {liked ? (
            <Heart
              size={24}
              className="sm:w-[30px] sm:h-[30px]"
              color="red"
              fill="red"
            />
          ) : (
            <Heart size={24} className="sm:w-[30px] sm:h-[30px]" />
          )}
        </button>
        <p className="font-semibold text-xs sm:text-sm">
          {likeCountState} likes
        </p>
      </div>

      {/* Caption */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <p className="text-xs sm:text-sm flex gap-2">
          <span className="font-semibold shrink-0">rvcjinsta</span>
          <span className="wrap-break-words">{caption}</span>
        </p>
      </div>
      <hr />
    </div>
  );
}
