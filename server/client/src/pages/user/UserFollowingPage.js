import React from "react";
import UserFollowing from "./UserFollowing";
import Title from "../../components/Title";
import FootBar from "../../components/footer/FootBar";

export default function UserFollowingPage() {
  return (
    <div className="App">
      <Title title="팔로잉 목록" />
      <UserFollowing />

      <FootBar />
    </div>
  );
}
