import React, { useEffect, useState } from "react";
import "./CommunityFeed.css";
import { supabase } from "../../Pages/Supabase";
import PostCard from "../Postcard/Postcard";

function getKey(obj, name) {
  if (!obj) return undefined;
  if (obj[name] !== undefined) return obj[name];
  const lower = name.toLowerCase();
  const found = Object.keys(obj).find(
    (k) => k.toLowerCase().replace(/['''`]/g, "'") === lower.replace(/['''`]/g, "'")
  );
  return found ? obj[found] : undefined;
}

function isValidUrl(str) {
  if (!str || typeof str !== "string") return false;
  const t = str.trim();
  return t.startsWith("http://") || t.startsWith("https://");
}

export default function CommunityFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("community")
          .select("*")
          .not("id", "in", "(3,2)")
          .order("id", { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error("Feed fetch failed:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="cf-feed">
        {[1, 2, 3].map((i) => (
          <div key={i} className="cf-skeleton" />
        ))}
      </div>
    );
  }

  const validPosts = posts.filter((post) => {
    const hasText = !!(
      (post.post_text1 && post.post_text1.trim()) ||
      (post.post_text3 && post.post_text3.trim())
    );
    const hasImage = isValidUrl(post.post_img1);
    return hasText || hasImage;
  });

  if (!validPosts.length) {
    return (
      <div className="cf-empty">
        <p>No posts yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="cf-feed">
      {validPosts.map((post) => {
        const groupName =
          getKey(post, "Groups's_name") ||
          getKey(post, "Groups\u2019s_name") ||
          "";

        const userName =
          getKey(post, "User's_name") ||
          getKey(post, "User\u2019s_name") ||
          "";

        const images = [
          post.post_img1,
          post.post_img2,
          post.post_img3,
        ].filter(isValidUrl);

        const caption = post.post_text1?.trim() || post.post_text3?.trim() || "";

        return (
          <PostCard
            key={post.id}
            supplierName={groupName}
            supplierAvatar={post.groups_pfp || null}
            authorName={userName}
            date={post.date || ""}
            caption={caption}
            images={images}
            likes={post.Like_count ?? 0}
            shares={post.Share_count ?? 0}
            comments={post.Comment_count ?? 0}
          />
        );
      })}
    </div>
  );
}