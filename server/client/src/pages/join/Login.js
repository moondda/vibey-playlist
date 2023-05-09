import React from "react";
import styled from "styled-components";
import logo from "../../assets/0417.png";

export default function Login() {
  return (
    <div className="login_box">
      <img src={logo} style={{ width: "150px", marginBottom: "40px" }}></img>
      <div>
        <InputBox className="user_login" placeholder="username"></InputBox>

        <InputBox className="user_password" placeholder="password"></InputBox>

        <ButtonBox>Sign in</ButtonBox>
      </div>
    </div>
  );
}

const InputBox = styled.input`
  margin: 0 auto;
  border: none;
  height: 50px;
  width: 300px;
  border-radius: 15px;
  /* justify-content: center; */
  /* display: flex; */
  /* align-items: center; */
  margin-bottom: 10px;
  padding-left: 20px;
  /* background-color: #700fff; */
`;

const ButtonBox = styled.div`
  background-color: #841bc5;
  width: 320px;
  height: 50px;
  border-radius: 15px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 30px;
`;
