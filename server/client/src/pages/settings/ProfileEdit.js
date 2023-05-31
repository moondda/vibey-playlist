import React, { useState } from "react";
import Profile from "../mypage/Profile";
import styled from "styled-components";
import editImg from "../../assets/profileImg.jpg";

const ProfileEdit = (props) => {
  const [descript, setDescript] = useState("");
  const [nick, setNick] = useState("");

  // const handleNickname = (e) => {
  //   axios
  //     .post("http://localhost:5000/setting/nickname", {
  //       nickname: nick,
  //     })
  //     .then((res) => {
  //       console.log("res.data :", res.data);
  //       if (res.data.result == true) {
  //         alert(res.data.message);
  //         console.log(res.data.message);
  //         // setConfirmPwdValid(true);
  //       } else {
  //         console.log(res.data.message);
  //         // setConfirmPwdValid(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("확인 실패:", err);
  //     });
  // };

  return (
    <DescriptContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            color: "white",
            margin: "0 auto",
            marginBottom: "20px",
            marginTop: "30px",
          }}
        >
          <EditText>프로필 이미지</EditText>
          <ProfileImg>
            <img
              src={editImg}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </ProfileImg>
        </div>
        <div>
          <InputFieldWrapper>
            <EditText style={{ color: "white", textAlign: "left" }}>
              닉네임
            </EditText>
            <div style={{ display: "flex" }}>
              <InputField placeholder="닉네임"></InputField>
            </div>
          </InputFieldWrapper>
          <InputFieldWrapper>
            <EditText style={{ color: "white", textAlign: "left" }}>
              한 줄 소개
            </EditText>
            <div style={{ display: "flex" }}>
              <InputField placeholder="한줄소개"></InputField>
            </div>
          </InputFieldWrapper>
        </div>
      </div>
      <ButtonBox>저장</ButtonBox>
    </DescriptContainer>
  );
};

export default ProfileEdit;

const ButtonBox = styled.div`
  background-color: #841bc5;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 30px;
  width: 114px;
  height: 46px;

  border-radius: 15px;
`;

const InputFieldWrapper = styled.div`
  /* display: inline-block; */
  margin: 0 30px;
  margin-bottom: 20px;
  /* border: 1px solid yellow; */
`;

const InputField = styled.input`
  height: 50px;
  border: none;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  display: block;
  font-weight: 600;
  /* margin: 0 auto; */
  background: #3c3c3c;
  border-radius: 10px;
  outline: none;
  color: #ffffff;
`;

const DescriptContainer = styled.div`
  /* border: 1px solid pink; */
  top: 130px;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
`;

const ProfileImg = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 70%;
  overflow: hidden;
  margin: 10px;
  /* border: 1px solid red; */
`;

const EditText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
`;
