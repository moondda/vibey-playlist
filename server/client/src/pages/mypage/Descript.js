import React, { useEffect } from "react";
import styled from "styled-components";
import Profile from "./Profile";
import pfImg from "../../assets/profileImg.jpg";
import { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
// import User from "../../../../models/User";

//이미지, 닉네임, 한줄소개 컴포넌트

const Descript = (props) => {
  const [profileName, setProfileName] = useState("");
  const [bio, setBio] = useState("");
  const [countFeed, setCountFeed] = useState(0);
  const [countFollower, setCountFollower] = useState(0);
  const [countFollowing, setCountFollowing] = useState(0);
  const [img, setImg] = useState("");
  const location = useLocation();
  const nickname = location.pathname.split("/")[2];

  const [followStatus, setFollowStatus] = useState(false);

  const [userId, setUserId] = useState("");

  const [userData, setUserData] = useState([]);

  const viewUserInfo = async (nickname) => {
    try {
      if (nickname) {
        const response = await axios.get(
          `http://localhost:5000/user/info/${nickname}`
        );
        const data = response.data;
        console.log("res.data:", data);
        setImg(data.ProfileImg);
        setProfileName(data.nickname);
        setBio(data.bio);
        setCountFeed(data.countPost);
        setCountFollower(data.countFollowers);
        setCountFollowing(data.countFollowing);
        setUserData(data);
        setUserId(data.objectId);
      } else {
        const res = await axios
          .get("http://localhost:5000/user/info", {
            headers: {
              Authorization: `${sessionStorage.getItem("user_token")}`,
            },
          })
          .then((res) => {
            const data = res.data;
            console.log("res.data:", data);
            setImg(data.ProfileImg);
            setProfileName(data.nickname);
            setBio(data.bio);
            setCountFeed(data.countPost);
            setCountFollower(data.countFollowers);
            setCountFollowing(data.countFollowing);
            setUserData(data);
            setUserId(data.objectId);
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
    } catch (error) {
      console.log("Error", error);
      alert(error);
    }
  };

  useEffect(() => {
    console.log("dfd");
    viewUserInfo(nickname);
  }, [nickname]);

  const actfollow = () => {
    console.log("userId", userId);
    axios
      .post(
        `http://localhost:5000/user/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `${sessionStorage.getItem("user_token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res.data:", res.data);
        if (res.data.message === "Successfully followed") {
          setFollowStatus(true);
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };
  console.log("followstatus:", followStatus);

  return (
    <DescriptContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProfileImg>
          <img
            src={userData.profileImg}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </ProfileImg>
        <ProfileIntro>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#ffffff" }}>
            {profileName}
          </p>
          <p style={{ fontSize: "12px", color: "#eee" }}>{bio}</p>
          <p style={{ fontSize: "12px", color: "#eee" }}>
            email : dge3179@ajou.ac.kr
          </p>
          <button onClick={actfollow} style={{ fontWeight: "700" }}>
            {followStatus ? "언팔로우" : "팔로우"}
          </button>
          {/* {userData._id !== loggedInUserId && <button>팔로우</button>} */}
        </ProfileIntro>
      </div>

      <FollowBox>
        <FollowText>
          <p>{countFeed}</p>
          <p>피드</p>
        </FollowText>
        <FollowText>
          <Link
            to="/profile/followers"
            style={{ textDecoration: "none", color: "#ffffff" }}
          >
            {" "}
            <p>{countFollower}</p>
            <p>팔로워</p>
          </Link>
        </FollowText>
        <FollowText>
          <Link
            to="/profile/following"
            style={{ textDecoration: "none", color: "#ffffff" }}
          >
            <p>{countFollowing}</p>
            <p>팔로잉</p>
          </Link>
        </FollowText>
      </FollowBox>
    </DescriptContainer>
  );
};

export default Descript;

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

const ProfileIntro = styled.div`
  /* border: 1px solid yellow; */
  margin-left: 15px;
  margin-right: 15px;
  text-align: left;
`;

const ProfileImg = styled.div`
  width: 105px;
  height: 105px;
  border-radius: 70%;
  overflow: hidden;
  margin: 10px;
  /* border: 1px solid red; */
`;

const FollowBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-around;
  margin: 20px;
`;

const FollowText = styled.div`
  font-size: 14px;
  /* border: 1px solid green; */
  color: #eee;
  text-align: center;
  align-items: center;
`;
