import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function UserFollowing() {
  const [userNick, setUserNick] = useState("");
  const [userImg, setUserImg] = useState("");

  const [followingList, setFollowingList] = useState([]);

  const viewFollowingList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/who-follow", {
        headers: {
          Authorization: `${sessionStorage.getItem("user_token")}`,
        },
      });
      console.log("res:", res.data);
      console.log("res.data.follow:", res.data.following);
      setFollowingList(res.data.following);
      // setUserNick(res.data.following.nickname);
      console.log(followingList);
    } catch (err) {
      console.log("err:", err);
    }
  };

  useEffect((e) => {
    viewFollowingList();
  }, []);

  return (
    <DescriptContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {followingList &&
          followingList.map((users, index) => {
            return (
              <div style={{ margin: "0 auto" }}>
                <ProfileImg key={index}>
                  <img
                    src={users.profileImage}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ProfileImg>
                <p style={{ color: "#ffffff" }}>{users.nickname}</p>
              </div>
            );
          })}
      </div>
    </DescriptContainer>
  );
}

const DescriptContainer = styled.div`
  /* border: 1px solid pink; */
  /* top: 130px; */
  top: 190px;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
`;

const ProfileImg = styled.div`
  width: 105px;
  height: 105px;
  border-radius: 70%;
  overflow: hidden;
  margin: 10px;
  /* border: 1px solid red; */
`;
