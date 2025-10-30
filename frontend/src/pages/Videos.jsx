import React from 'react'
import PostCard from '../components/PostCard'
import Loading from '../components/Loading'

function Videos() {
  const data ={
    profilePhoto:"https://images.pexels.com/photos/8386605/pexels-photo-8386605.jpeg",
    authorName:"Jack Bhai",
    follow:false,
    fileLink:"https://www.pexels.com/download/video/19149712/",
    like:false,
    likeCount:356,
    caption:"kuch to hai",
    fileType:"video"
  }
  return (
    <>
    <PostCard data={data} />
    <Loading/>
    </>
  )
}

export default Videos