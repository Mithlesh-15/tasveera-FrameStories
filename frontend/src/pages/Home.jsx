import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  // All loaded posts
  const [posts, setPosts] = useState([]);

  // Whether more posts are available
  const [hasMore, setHasMore] = useState(true);

  // Bottom div for infinite scroll trigger
  const observerRef = useRef(null);

  // Prevents multiple API calls at once
  const isFetchingRef = useRef(false);

  // Current page number (no re-render on change)
  const pageRef = useRef(1);

  // Fetch next page of posts
  const fetchPosts = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;

    try {
      const res = await axios.get(
        `https://tasveera-mithlesh.vercel.app/api/v1/feed/images?page=${pageRef.current}&limit=6`,
        { withCredentials: true }
      );

      const newPosts = res.data?.data || [];

      // Add only new posts (avoid duplicates)
      setPosts((prev) => {
        const ids = new Set(prev.map((p) => p._id));
        const unique = newPosts.filter((p) => !ids.has(p._id));
        return [...prev, ...unique];
      });

      // If less than limit, no more data
      if (newPosts.length < 6) setHasMore(false);
      else pageRef.current += 1;
    } catch (error) {
      console.error("Feed error:", error);
      if (error.status == 401) {
        toast.error("Please Login First");
      }
      navigate("/login");
    }

    isFetchingRef.current = false;
  }, [hasMore]);

  // First load
  useEffect(() => {
    fetchPosts();
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    let timer = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingRef.current) {
          timer = setTimeout(fetchPosts, 500); // small throttle
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
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

      {/* Trigger point for loading more posts */}
      {hasMore && <div ref={observerRef} className="h-2" />}
    </div>
  );
}

export default Home;
