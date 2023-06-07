import React from "react";
import UserFollowing from "./UserFollowing";
import Title from "../../components/Title";
import FootBar from "../../components/footer/FootBar";
import UserFollower from "./UserFollower";

export default function UserFollowerPage() {
  return (
    <div className="App">
      <Title title="팔로워 목록" />
      <UserFollower />
      <FootBar />
    </div>
  );
}
