import React, { useState } from "react";
import "./Style.css";
import Viewall from "../Components/Viewall/Viewall";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import SectionTitle from "../Components/Sectitle/Secttitle";
import Cchips from "../Components/Chips/Cchips";
import { VideoPost, PollPost, EventPost } from "../Components/Postcard/Posts";
import Gc from "../Components/GroupsSection/GroupsSection";
import Communityfeed from "../Components/CommunityFeed/CommunityFeed";
import { supabase } from "./Supabase";

function Community() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [posting, setPosting] = useState(false);
  const [form, setForm] = useState({ name: "", text: "", img: "" });
  const [newPosts, setNewPosts] = useState([]);

  const openSheet = () => {
    setForm({ name: "", text: "", img: "" });
    setSheetOpen(true);
  };

  const closeSheet = () => setSheetOpen(false);

  const handlePost = async () => {
    if (!form.text.trim()) return;
    setPosting(true);
    try {
      const today = new Date().toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
      });
      const payload = {
        "User's_name": form.name.trim() || "Anonymous",
        post_text1: form.text.trim(),
        post_img1: form.img.trim() || null,
        date: today,
        "Like_count": 0,
        "Share_count": 0,
        "Comment_count": 0,
      };
      const { data, error } = await supabase
        .from("community")
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      setNewPosts((prev) => [data, ...prev]);
      setSheetOpen(false);
    } catch (err) {
      console.error("Post failed:", err.message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="body">
      <style>{`
        .com-fab {
          position: fixed; bottom: 90px; right: 20px;
          width: 52px; height: 52px; border-radius: 50%;
          background: #fff; color: #000; border: none;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; z-index: 200;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          transition: transform 0.2s, opacity 0.2s;
        }
        .com-fab:hover { transform: scale(1.08); }
        .com-fab:active { transform: scale(0.95); }
        .com-fab svg { width: 22px; height: 22px; }

        .com-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.55);
          z-index: 400; opacity: 0; pointer-events: none; transition: opacity 0.25s;
        }
        .com-overlay.open { opacity: 1; pointer-events: all; }

        .com-sheet {
          position: fixed; bottom: 0; left: 0; right: 0;
          background: #111; border-top: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px 20px 0 0; padding: 20px 20px 40px;
          z-index: 500; transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
          max-height: 85vh; overflow-y: auto;
        }
        .com-sheet.open { transform: translateY(0); }

        .com-sheet-handle {
          width: 36px; height: 4px; background: rgba(255,255,255,0.2);
          border-radius: 2px; margin: 0 auto 20px;
        }
        .com-sheet-header {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 24px;
        }
        .com-sheet-title {
          font-family: "Lexend Exa", sans-serif;
          font-size: 16px; font-weight: 600; color: #fff; margin: 0;
        }
        .com-sheet-close {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.4); display: flex;
          align-items: center; padding: 0; transition: color 0.15s;
        }
        .com-sheet-close:hover { color: #fff; }
        .com-sheet-close svg { width: 20px; height: 20px; }

        .com-field-label {
          font-family: "Lexend Exa", sans-serif; font-size: 11px;
          color: rgba(255,255,255,0.35); letter-spacing: 0.08em;
          text-transform: uppercase; margin: 0 0 8px;
        }
        .com-field-input {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 12px 14px;
          font-family: "Lexend Exa", sans-serif; font-size: 13px; color: #fff;
          outline: none; margin-bottom: 20px; transition: border-color 0.2s;
          resize: none;
        }
        .com-field-input::placeholder { color: rgba(255,255,255,0.25); }
        .com-field-input:focus { border-color: rgba(255,255,255,0.35); }

        .com-post-btn {
          font-family: "Lexend Exa", sans-serif;
          font-size: 14px; font-weight: 600;
          background: #fff; color: #000; border: none;
          border-radius: 14px; padding: 16px;
          cursor: pointer; transition: opacity 0.15s; width: 100%;
        }
        .com-post-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .com-post-btn:hover:not(:disabled) { opacity: 0.9; }
        .com-post-btn-small {
          font-family: "Lexend Exa", sans-serif;
          font-size: 12px; font-weight: 600;
          background: #fff; color: #000; border: none;
          border-radius: 10px; padding: 8px 18px;
          cursor: pointer; transition: opacity 0.15s; white-space: nowrap;
        }
        .com-post-btn-small:disabled { opacity: 0.4; cursor: not-allowed; }
        .com-post-btn-small:hover:not(:disabled) { opacity: 0.9; }

        .com-new-post {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 16px; margin-bottom: 16px;
        }
        .com-new-post-header {
          display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .com-new-post-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-family: "Lexend Exa", sans-serif; font-size: 14px; color: #fff;
          flex-shrink: 0;
        }
        .com-new-post-name {
          font-family: "Lexend Exa", sans-serif;
          font-size: 13px; font-weight: 600; color: #fff; margin: 0;
        }
        .com-new-post-date {
          font-family: "Lexend Exa", sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.35); margin: 2px 0 0;
        }
        .com-new-post-text {
          font-family: "Lexend Exa", sans-serif;
          font-size: 13px; color: rgba(255,255,255,0.8);
          line-height: 1.6; margin: 0 0 12px;
        }
        .com-new-post-img {
          width: 100%; border-radius: 12px;
          object-fit: cover; max-height: 200px; margin-bottom: 12px;
        }
        .com-new-post-stats { display: flex; gap: 16px; }
        .com-new-post-stat {
          font-family: "Lexend Exa", sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.35);
        }
      `}</style>

      <div className="bodyy">
        <Topbar />

        <div className="Sec">
          <SectionTitle
            title="Community"
            subtitle="Connect with fellow entrepreneurs"
          />
        </div>

        <Cchips />

        <div className="Sec">
          <div className="ttll">
            <SectionTitle title="Featured Groups" />
            <Viewall text="View all" variant="ghost" />
          </div>
          <Gc />
        </div>

        <Communityfeed />

        {newPosts.length > 0 && (
          <div className="Sec" style={{ flexDirection: "column", gap: 0 }}>
            {newPosts.map((post) => (
              <div key={post.id} className="com-new-post">
                <div className="com-new-post-header">
                  <div className="com-new-post-avatar">
                    {(post["User's_name"] || "A")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="com-new-post-name">{post["User's_name"] || "Anonymous"}</p>
                    <p className="com-new-post-date">{post.date}</p>
                  </div>
                </div>
                <p className="com-new-post-text">{post.post_text1}</p>
                {post.post_img1 && (
                  <img src={post.post_img1} alt="post" className="com-new-post-img" />
                )}
                <div className="com-new-post-stats">
                  <span className="com-new-post-stat">0 Likes</span>
                  <span className="com-new-post-stat">0 Comments</span>
                  <span className="com-new-post-stat">0 Shares</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="Sec">
          <VideoPost
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
            name="Momen Hady"
            role="Supplier"
            date="10 Feb 2026"
            caption="Take a look at our new arrivals today !"
            thumbnail="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800"
            tags={["Growth", "SupplyChain"]}
            likes={214} shares={214} comments={214}
            onPlay={() => console.log("play")}
          />
          <PollPost
            avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
            name="Momen Hady"
            role="Supplier"
            date="10 Feb 2026"
            question="What's your biggest challenge in finding suppliers?"
            options={["Quality consistency", "Pricing negotiations", "Communication"]}
            totalVotes={156} closesIn="2 days"
            likes={214} shares={214} comments={214}
          />
          <EventPost
            avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
            name="Momen Hady"
            role="Supplier"
            date="10 Feb 2026"
            caption="What's your biggest challenge in finding suppliers?"
            eventTitle="Fashion Entrepreneurs Meetup - Dubai"
            eventDate="March 15, 2026 • 6:00 PM - 9:00 PM"
            eventLocation="Dubai Design District, Building 6"
            tags={["Growth", "SupplyChain"]}
            interestedAvatars={[
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60",
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60",
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60",
            ]}
            interestedCount={64}
            likes={214} shares={214} comments={214}
            onRegister={() => console.log("register")}
          />
        </div>

        <div className="spacedown" />
        <Navbarr />
      </div>

      {/* FLOATING + BUTTON */}
      <button className="com-fab" onClick={openSheet}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* OVERLAY */}
      <div className={`com-overlay${sheetOpen ? " open" : ""}`} onClick={closeSheet} />

      {/* POST SHEET */}
      <div className={`com-sheet${sheetOpen ? " open" : ""}`}>
        <div className="com-sheet-handle" />

        <div className="com-sheet-header">
          <p className="com-sheet-title">New Post</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              className="com-post-btn-small"
              onClick={handlePost}
              disabled={posting || !form.text.trim()}
            >
              {posting ? "Posting..." : "Post"}
            </button>
            <button className="com-sheet-close" onClick={closeSheet}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <p className="com-field-label">Your Name</p>
        <input
          className="com-field-input"
          type="text"
          placeholder="e.g. Sara Ahmed"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />

        <p className="com-field-label">What's on your mind?</p>
        <textarea
          className="com-field-input"
          rows={4}
          placeholder="Share something with the community..."
          value={form.text}
          onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
        />

        <p className="com-field-label">Image URL (optional)</p>
        <input
          className="com-field-input"
          type="text"
          placeholder="https://..."
          value={form.img}
          onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))}
        />

        <button
          className="com-post-btn"
          onClick={handlePost}
          disabled={posting || !form.text.trim()}
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

export default Community;