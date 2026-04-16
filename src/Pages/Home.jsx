import React, { useEffect, useState } from "react";
import "./Style.css";
import Operations from "../Components/Operations/Activeoperations";
import Topbar from "../Components/Topbar/Topbar";
import Usercard from "../Components/Topbar/Usercard";
import BH from "../Components/BusinessHealth/Businesshealth";
import Navbarr from "../Components/Navbar/Navbar";
import Qa from "../Components/Quickactions/Quickactionsgrid";
import { supabase } from "./Supabase";
import SectionTitle from "../Components/Sectitle/Secttitle";
import Viewall from "../Components/Viewall/Viewall";
import Coursesec from "../Components/Coursescards/Coursesec";
import Postcard from "../Components/Postcard/Postcard";

// helper — finds a key regardless of apostrophe encoding
function getKey(obj, name) {
  if (!obj) return undefined;
  if (obj[name] !== undefined) return obj[name];
  const lower = name.toLowerCase();
  const found = Object.keys(obj).find(
    (k) => k.toLowerCase().replace(/['''`]/g, "'") === lower.replace(/['''`]/g, "'")
  );
  return found ? obj[found] : undefined;
}

function Home() {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data: user, error: userError } = await supabase
          .from("home screen eng")
          .select("*")
          .eq("id", 1)
          .single();

        if (userError) throw userError;
        setUserData(user);

        const { data: community, error: communityError } = await supabase
          .from("community")
          .select("*")
          .eq("id", 1);

        if (communityError) throw communityError;

        if (community?.length) {
          console.log("Community keys:", Object.keys(community[0]));
          console.log("Community row:", community[0]);
        }

        setPosts(community || []);
      } catch (err) {
        console.error("Fetch failed:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="body">
        <div className="home-loading">
          <div className="home-loading-spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="bodyy">
        <Topbar />

        {userData && (
          <Usercard
            name={userData.name}
            role="Brand owner"
            rating={5}
            reviewCount={userData.review_number}
            avatarUrl={userData.pfp}
          />
        )}

        <div className="Sec">
          <SectionTitle title="Quick Actions" />
          <Qa />
        </div>

        <div className="Sec">
          <SectionTitle title="Business Health" />
          <BH />
        </div>

        <div className="Sec">
          <div className="ttll">
            <SectionTitle title="Active Operations" />
            <Viewall text="View all" variant="ghost" />
          </div>
          <Operations />
        </div>

        <div className="Secc">
          <div className="ttll">
            <SectionTitle title="Courses you might like" />
            <Viewall text="View all" variant="ghost" />
          </div>
          <Coursesec />
        </div>

        <div className="Sec">
          <div className="ttll">
            <SectionTitle title="Community" />
            <Viewall text="View all" variant="ghost" />
          </div>
          <div className="posts-list">
            {posts.map((post) => (
              <Postcard
                key={post.id}
                supplierName={
                  getKey(post, "Groups's_name") ||
                  getKey(post, "Groups\u2019s_name") ||
                  getKey(post, "groups_name") ||
                  "Unknown Group"
                }
                supplierAvatar={
                  getKey(post, "posting_user's_pfp1") ||
                  getKey(post, "posting_user\u2019s_pfp1") ||
                  post.groups_pfp
                }
                authorName={
                  getKey(post, "User's_name") ||
                  getKey(post, "User\u2019s_name") ||
                  ""
                }
                date={post.date}
                caption={post.post_text1}
                images={[
                  post.post_img1,
                  post.post_img2,
                  post.post_img3,
                ].filter(Boolean)}
                likes={post.Like_count ?? 0}
                shares={post.Share_count ?? 0}
                comments={post.Comment_count ?? 0}
              />
            ))}
          </div>
        </div>

        <Navbarr />
      </div>
    </div>
  );
}

export default Home;