import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo_vibey.png";
import { useState } from "react";
import axios from "axios";


export default function Login() {

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const handleId = (e) =>{
    setId(e.target.value);
  }

  const handlePwd = (e) =>{
    setPwd(e.target.value);

  }
  const handleLogin = () => {
    axios.post("http://localhost:5000/auth/login", {
      id: id,
      pw: pwd
    })
         .then((response) => {
        console.log("로그인이 완료되었습니다.");
        alert("로그인이 완료되었습니다.");
        console.log(response.data);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  }

  return (
    <div className="login_box">
      <img src={logo} style={{ width: "150px", marginBottom: "40px" }}></img>

      <div>
        <InputBox className="user_login" placeholder="username" value={id} onChange={handleId}></InputBox>

        <InputBox className="user_password" placeholder="password" value={pwd} onChange={handlePwd}></InputBox>

        <ButtonBox type="submit"
        onClick={() => { handleLogin();
        }}>Sign in</ButtonBox>
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
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
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
