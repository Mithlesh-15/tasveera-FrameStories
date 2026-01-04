import React, { useState } from "react";
import { Heart, MessageCircle, Bookmark, Grid, User, Menu } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logout from "../utils/logout";
import { useEffect } from "react";
import axios from "axios";

export default function InstagramProfile() {
  const param = useParams();
  const navigate = useNavigate();

  const [owner, setOwner] = useState(true);
  const [following, setFollowing] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(
    "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
  );
  const [username, setUsername] = useState("");
  const [fullname, setfullname] = useState("");
  const [bio, setBio] = useState("");
  const [followingNumber, setFollowingNumber] = useState(null);
  const [followersNumber, setFollowersNumber] = useState(null);
  const [posts, setPosts] = useState([]);
  const [disable, setDisable] = useState(false);

  const handleFollow = async () => {
    const profileId = param.profileid;
    if (!profileId || disable) return;
    setDisable(true);

    try {
      const endpoint = following
        ? "/api/v1/action/unfollow"
        : "/api/v1/action/follow";
        console.log(endpoint)

      const { data } = await axios.post(endpoint, { profileId });

      if (data.success) {
        setFollowing((prev) => !prev);
        setFollowersNumber(data.data.followers.length)
        console.log("Success:", data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.error("Follow/Unfollow error:", errorMessage);
    } finally {
      setDisable(false);
    }
  };

  const getPost = async (postids) => {
    try {
      const post = await Promise.all(
        postids.map(async (onePostId) => {
          const response = await axios.post("/api/v1/profile/get-one-post", {
            onePostId,
          });
          return {
            id: response.data.data.id,
            image: response.data.data.image,
          };
        })
      );
      if (post != []) {
        setPosts(post);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const data = async () => {
    try {
      const { profileid } = param;
      const response = await axios.post("/api/v1/profile/get-profile-details", {
        profileid,
      });
      if (!response.data) {
        navigate("/");
      }
      setOwner(response.data.owner);
      setProfilePhoto(response.data.data.profilePhoto);
      setUsername(response.data.data.username);
      setBio(response.data.data.bio);
      setfullname(response.data.data.fullName);
      setFollowingNumber(response.data.data.following.length);
      setFollowersNumber(response.data.data.followers.length);
      getPost(response.data.data.posts);
      setFollowing(response.data.followed);
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  useEffect(() => {
    data();
  }, []);

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
                  src={profilePhoto}
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
                <h2 className="text-lg md:text-xl font-normal">{username}</h2>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {owner ? (
                  <>
                    <Link
                      to="/update-profile"
                      className="flex-1 bg-gray-200 hover:bg-blue-200 text-black font-semibold py-2 px-4 rounded-lg transition text-sm text-center"
                    >
                      Edit Profile
                    </Link>
                    <button
                      className="flex-1 bg-gray-200 hover:bg-red-300 text-red-500 font-semibold py-2 px-4 rounded-lg transition text-sm"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleFollow}
                      disabled={disable}
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
                  <span className="font-semibold">{posts.length}</span> posts
                </div>
                <div>
                  <span className="font-semibold">{followersNumber}</span>{" "}
                  followers
                </div>
                <div>
                  <span className="font-semibold">{followingNumber}</span>{" "}
                  following
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Mobile */}
        <div className="md:hidden border-t border-b py-3 mb-4">
          <div className="flex justify-around text-center">
            <div>
              <div className="font-semibold">{posts.length}</div>
              <div className="text-gray-500 text-sm">posts</div>
            </div>
            <div>
              <div className="font-semibold">{followersNumber}</div>
              <div className="text-gray-500 text-sm">followers</div>
            </div>
            <div>
              <div className="font-semibold">{followingNumber}</div>
              <div className="text-gray-500 text-sm">following</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h3 className="font-semibold mb-1">{fullname}</h3>
          <p className="text-sm">{bio}</p>
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
