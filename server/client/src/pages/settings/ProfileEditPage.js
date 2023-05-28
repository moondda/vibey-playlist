import React from "react";
import Title from "../../components/Title";
import FootBar from "../../components/footer/FootBar";
import ProfileEdit from "./ProfileEdit";

export default function ProfileEditPage() {
  return (
    <div className="App">
      <Title title="프로필 수정" />
      <ProfileEdit />
      <FootBar />
    </div>
  );
}
