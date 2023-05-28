import React from "react";
import FootBar from "../../components/footer/FootBar";
import Title from "../../components/Title";
import SettingList from "./SettingList";

export default function SettingPage() {
  return (
    <div className="App">
      <Title title="설정" />
      <SettingList />

      <FootBar />
    </div>
  );
}
