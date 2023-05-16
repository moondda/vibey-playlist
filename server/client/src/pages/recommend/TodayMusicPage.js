import React from "react";
import TodayMusic from "./TodayMusic";
import NotiBox from "../../components/notification/NotiBox";
import { AddModal } from "../../components/notification/AddModal";
import FootBar from "../../components/footer/FootBar";

export default function TodayMusicPage() {
  return (
    <div className="App">
      <TodayMusic />
      {/* <NotiBox noti="You have deleted successfully!"></NotiBox> */}
      <AddModal />
      <FootBar />
    </div>
  );
}
