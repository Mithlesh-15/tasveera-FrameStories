import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const isFetchingRef = useRef(false);
  const pageRef = useRef(1); //page as ref (no re-render)

  // 🔥 Fetch posts (stable + safe)
  const fetchPosts = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;

    try {
      const res = await axios.get(
        `/api/v1/feed/videos?page=${pageRef.current}&limit=6`,
        { withCredentials: true }
      );

      const newPosts = res.data?.data || [];

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const uniquePosts = newPosts.filter((p) => !existingIds.has(p._id));
        return [...prev, ...uniquePosts];
      });

      if (newPosts.length < 6) {
        setHasMore(false);
      } else {
        pageRef.current += 1; // 🔥 next page
      }
    } catch (error) {
      console.error("Feed fetch error:", error);
      if (error.status == 401) {
        navigate("/login");
      }
    }
    isFetchingRef.current = false;
  }, [hasMore]);

  // 🔹 First load
  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔹 Smooth Intersection Observer (NO lag)
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    let timeoutId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingRef.current) {
          timeoutId = setTimeout(() => {
            fetchPosts();
          }, 300); // throttle
        }
      },
      {
        rootMargin: "300px", // prefetch early
        threshold: 0,
      }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fetchPosts, hasMore]);

  return (
    <div className="max-w-xl mx-auto">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          data={{
            PostId: post._id,
            id: post.owner._id,
            profilePhoto: post.owner.profilePhoto,
            authorName: post.owner.username,
            fileLink: post.dataLink,
            likeCount: post.likes,
            caption: post.caption,
            fileType: post.type,
          }}
        />
      ))}

      {hasMore && <div ref={observerRef} className="h-2" />}
    </div>
  );
}

export default Home;
