import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function Post() {
  const { postid } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    PostId: null,
    id: null,
    profilePhoto: null,
    authorName: null,
    fileLink: null,
    likeCount: null,
    caption: null,
    fileType: null,
  });
  const bringPost = async () => {
    try {
      const response = await api.post("/api/v1/post/show-one-post", {
        postid,
      });

      if (!response.data.success) {
        toast.error(response.data.message);
        navigate("/");
        console.log(response.data);
        return;
      }
      setData(response.data.data);
      setData((prev) => ({
        ...prev,
        PostId: postid,
      }));
    } catch (error) {
      console.log("Bring Post Error:", error);
      toast.error(error.response.data.message);
      if (error.status == 401) {
        toast.error("Please Login First");
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  };
  useEffect(() => {
    if (postid) {
      bringPost();
    }
  }, []);
  return (
    <>
      <PostCard data={data} />
    </>
  );
}

export default Post;
