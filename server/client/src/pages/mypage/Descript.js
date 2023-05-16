import React from "react";
import styled from "styled-components";
import Profile from "./Profile";
import pfImg from "../../assets/profileImg.jpg";

//이미지, 닉네임, 한줄소개 컴포넌트

const Descript = (props) => {
  return (
    <DescriptContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProfileImg>
          <img
            src={pfImg}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </ProfileImg>
        <ProfileIntro>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>chaemin</p>
          <p style={{ fontSize: "12px", color: "#eee" }}>
            Do you wanna listen to my playlist?
          </p>
          <p style={{ fontSize: "12px", color: "#eee" }}>
            email : dge3179@ajou.ac.kr
          </p>
        </ProfileIntro>
      </div>

      <FollowBox>
        <FollowText>
          <p>9</p>
          <p>피드</p>
        </FollowText>
        <FollowText>
          <p>432</p>
          <p>팔로워</p>
        </FollowText>
        <FollowText>
          <p>245</p>
          <p>팔로잉</p>
        </FollowText>
      </FollowBox>
    </DescriptContainer>
  );
};

export default Descript;

const DescriptContainer = styled.div`
  /* border: 1px solid pink; */
  top: 130px;
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
