import React from 'react'
import PostCard from '../components/PostCard'

function Post() {
     const data = {
    profilePhoto:
      "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg",
    authorName: "Raja Sahab",
    follow: false,
    fileLink:
      "https://images.pexels.com/photos/1912176/pexels-photo-1912176.jpeg",
    like: false,
    likeCount: 4987548987,
    caption: "kuch to hai",
    fileType: "image",
  };
  return (
    <>
    <PostCard data={data}/>
    </>
  )
}

export default Post