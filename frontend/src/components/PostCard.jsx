import React, { useRef, useState } from "react";
import { Heart, EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function PostCard({ data }) {
  let {
    PostId,
    id,
    profilePhoto,
    authorName,
    fileLink,
    likeCount,
    caption,
    fileType,
  } = data;

  const videoref = useRef(null);
  const [liked, setLiked] = useState(false);
  const [pause, setPause] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [owner, setOwner] = useState(false);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const [disableFollow, setDisableFollow] = useState(false);
  const [disableLike, setDisableLike] = useState(false);
  const togglePause = () => {
    if (fileType === "image") return;
    if (pause) {
      videoref.current.play();
      setPause(false);
    } else {
      videoref.current.pause();
      setPause(true);
    }
  };

  const getInfo = async () => {
    try {
      const response = await axios.post("/api/v1/post/is-like-follow-owner", {
        profileid: id,
        PostId,
      });
      setLiked(response.data.like);
      setFollowed(response.data.followed);
      setOwner(response.data.owner);
    } catch (error) {
      console.log("Post Card Error:", error);
    }
  };

  const handleFollow = async () => {
    const profileId = id;
    if (!profileId || disableFollow) return;
    setDisableFollow(true);

    try {
      const endpoint = followed
        ? "/api/v1/action/unfollow"
        : "/api/v1/action/follow";
      console.log(endpoint);

      const { data } = await axios.post(endpoint, { profileId });

      if (data.success) {
        setFollowed((prev) => !prev);
        console.log("Success:", data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.error("Follow/Unfollow error:", errorMessage);
    } finally {
      setDisableFollow(false);
    }
  };

  const handleLike = async () => {
    if (!PostId || disableLike) return;
    setDisableLike(true);
    try {
      const endpoint = liked ? "/api/v1/action/dislike" : "/api/v1/action/like";

      const { data } = await axios.post(endpoint, { postId: PostId });

      if (data.success) {
        setLiked((prev) => !prev);
        setLikeCountState(data.data.likes);
        console.log("Success:", data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.error("Follow/Unfollow error:", errorMessage);
    } finally {
      setDisableLike(false);
    }
  };

  useEffect(() => {
    if (!PostId || !id) return;
    getInfo();
    setLikeCountState(likeCount);
  }, [PostId, id]);

  useEffect(() => {
  if (fileType !== "video" || !videoref.current) return;

  const videoEl = videoref.current;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        videoEl.play().catch(() => {});
        setPause(false);
      } else {
        videoEl.pause();
        setPause(true);
      }
    },
    {
      threshold: 0.8, // at least 60% visible to play
    }
  );

  observer.observe(videoEl);

  return () => {
    observer.unobserve(videoEl);
  };
}, [fileType]);

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

          <Link
            to={`/profile/${id}`}
            className="font-semibold text-xs sm:text-sm truncate"
          >
            {authorName}
          </Link>
          {owner ? null : (
            <button
              onClick={handleFollow}
              disabled={disableFollow}
              className="ml-auto shrink-0"
            >
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
          )}
        </div>
        <button className="text-gray-600 ml-2 shrink-0">
          <EllipsisVertical className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="bg-white">
        {/* Image/Video - 16:9 Aspect Ratio */}
        <div
          onDoubleClick={handleLike}
          onClick={togglePause}
          className="w-full bg-gray-100"
          style={
            fileType === "video"
              ? { aspectRatio: "1/1" }
              : { aspectRatio: "1/1" }
          }
        >
          {fileType === "video" ? (
            <div className="relative w-full h-full">
              <video
                src={fileLink}
                ref={videoref}
                loop
                className="w-full h-full object-cover"
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
              />

              {pause && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 pointer-events-none">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
          ) : (
            <img
              src={fileLink}
              alt="Post"
              className="w-full h-full object-cover"
              onContextMenu={(e) => e.preventDefault()}
              style={{ WebkitTouchCallout: "none" }}
            />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 sm:gap-5 p-3 sm:p-4">
        <button
          onClick={handleLike}
          disabled={disableLike}
          className="hover:text-gray-600 shrink-0"
        >
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
          <span className="font-semibold shrink-0">{authorName}</span>
          <span className="wrap-break-words">{caption}</span>
        </p>
      </div>
      <hr />
    </div>
  );
}
