import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  const { postid } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    profilePhoto: null,
    authorName: null,
    follow: null,
    fileLink: null,
    like: null,
    likeCount: null,
    caption: null,
    fileType: null,
  });

  const bringPost = async () => {
    try {
      const response = await axios.post("/api/v1/post/show-one-post", {postid});

    if (!response.data.success) {
      navigate("/");
      console.log(response.data)
      return;
    }

    // seedha backend ka data set kar
    setData(response.data.data);
  } catch (error) {
    console.log("Bring Post Error:", error);
    navigate("/");
  }
  };
  useEffect(() => {
    bringPost();
  });
  return (
    <>
      <PostCard data={data} />
    </>
  );
}

export default Post;
