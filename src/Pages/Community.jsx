import React, { useState } from "react";
import "./Style.css";
import Viewall from "../Components/Viewall/Viewall";
import Topbar from "../Components/Topbar/Topbar";
import Navbarr from "../Components/Navbar/Navbar";
import SectionTitle from "../Components/Sectitle/Secttitle";
import Cchips from "../Components/Chips/Cchips"
import { VideoPost, PollPost, EventPost } from "../Components/Postcard/Posts";

import Gc from "../Components/GroupsSection/GroupsSection";
import Communityfeed from "../Components/CommunityFeed/CommunityFeed";
function Community() {
  return (
    <div className="body">
      <div className="bodyy">
        <Topbar />

        <div className="Sec">
          <SectionTitle
            title="Community"
            subtitle="Connect with fellow entrepreneurs"
          />
        </div>
<Cchips/>
<div className="Sec">
       <div className="ttll">
                <SectionTitle title="Featured Groups" />
                <Viewall text="View all" variant="ghost" />
              </div>
<Gc/></div>
<Communityfeed/>
<div className="Sec">
<VideoPost
  avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  name="Momen Hady"
  role="Supplier"
  date="10 Feb 2026"
  caption="Take a look at our new arrivals today !"
  thumbnail="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800"
  tags={["Growth", "SupplyChain"]}
  likes={214}
  shares={214}
  comments={214}
  onPlay={() => console.log("play")}
/>

<PollPost
  avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
  name="Momen Hady"
  role="Supplier"
  date="10 Feb 2026"
  question="What's your biggest challenge in finding suppliers?"
  options={["Quality consistency", "Pricing negotiations", "Communication"]}
  totalVotes={156}
  closesIn="2 days"
  likes={214}
  shares={214}
  comments={214}
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
  likes={214}
  shares={214}
  comments={214}
  onRegister={() => console.log("register")}
/></div>
        <div className="spacedown" />
        <Navbarr />
      </div>
    </div>
  );
}

export default Community;