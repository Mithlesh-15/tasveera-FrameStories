import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post("/api/v1/post/show-one-post", {
        postid,
      });

      if (!response.data.success) {
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
      navigate("/");
    }
  };
  useEffect(() => {
    if (postid) {
      bringPost();
    }
  }, []);
  return <>
  <PostCard data={data} />
  </>;
}

export default Post;
