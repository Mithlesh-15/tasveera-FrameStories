import React from "react";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";

function Home() {
  const data = {
    profilePhoto:
      "https://images.pexels.com/photos/6620658/pexels-photo-6620658.jpeg",
    authorName: "RVJC",
    follow: false,
    fileLink:
      "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
    like: false,
    likeCount: 356,
    caption: "kuch to hai",
    fileType: "image",
  };
  return (
    <>
      <PostCard data={data} />
      <Loading />
    </>
  );
}

export default Home;
