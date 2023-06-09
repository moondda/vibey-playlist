import React from "react";
import Profile from "./Profile";
import Descript from "./Descript";
import styled from "styled-components";
import Title from "../../components/Title";
import FootBar from "../../components/footer/FootBar";
import SearchBar from "../../components/Search";
import FindUser from "../user/FindUser";
import LogOut from "../join/Logout";

export default function ProfilePage() {
  return (
    <div className="App">
      <Title title="프로필" />
      <LogOut />
      <FindUser />
      <Descript />
      <Profile />
      <FootBar />
    </div>
  );
}

const ProfileContainer = styled.div`
  text-align: center;
  background-color: #5e5e5e;
  display: flex;
  /* align-items: center; */
  width: 100%;
  /* border: 1px solid red; */
  /* text-align: center;
  width: 390px;
  height: 844px;
  background-color: #5e5e5e;
  border: 1px solid black;
  align-items: center;
  display: flex; */
`;
