import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [configPwd, setConfigPwd] = useState("");
  const [email, setEmail] = useState("");

  const [nameValid, setNameValid] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [pwdValid, setPwdValid] = useState(false);
  const [configPwdValid, setConfigPwdValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const handleName = (e) => {
    const regexName = /^[ㄱ-ㅎ가-힣a-z0-9-_]{4,10}$/;
    setName(e.target.value);
    //닉네임은 특수문자를 제외한 4~10자리
    if (regexName.test(name)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePwd = (e) => {
    //최소 8자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
    // const regexPwd =
    //   "^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$";

    setPwd(e.target.value);

    // if (regexPwd.test(pwd)) {
    //   setPwdValid(true);
    // } else {
    //   setPwdValid(false);
    // }
  };

  const handleConfigPwd = (e) => {
    setConfigPwd(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    // const regexEmail =
    //   /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // if (regexEmail.test(email)) {
    //   setEmailValid(true);
    // } else {
    //   setEmailValid(false);
    // }
  };

  const register = () => {
    axios
      .post("http://localhost:5000/auth/sign-up", {
        id: id,
        pw: pwd,
        name: name,
        email: email,
      })
      .then((response) => {
        console.log("회원가입이 완료되었습니다.");
        alert("회원가입이 완료되었습니다.");
        console.log(response.data);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  useEffect(() => {
    if (idValid && nameValid && emailValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, nameValid, emailValid]);

  return (
    <div style={{ width: "100%" }}>
      <TitleBox>Sign Up</TitleBox>
      <InputFieldWrapper>
        <p style={{ color: "white", textAlign: "left" }}>nickname</p>
        <div style={{ display: "flex" }}>
          <InputField
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={handleName}
          ></InputField>
          <ConfirmBox>Confirm</ConfirmBox>
        </div>
      </InputFieldWrapper>

      <InputFieldWrapper>
        <p style={{ color: "white", textAlign: "left" }}>id</p>
        <div style={{ display: "flex" }}>
          <InputField
            placeholder="아이디를 입력해주세요"
            value={id}
            onChange={handleId}
          ></InputField>
          <ConfirmBox>Confirm</ConfirmBox>
        </div>
      </InputFieldWrapper>

      <InputFieldWrapper>
        <p style={{ color: "white", textAlign: "left" }}>password</p>
        <div style={{ display: "flex" }}>
          <InputField
            placeholder="비밀번호를 입력해주세요"
            value={pwd}
            onChange={handlePwd}
            type="password"
          ></InputField>
        </div>
      </InputFieldWrapper>

      <InputFieldWrapper>
        <p style={{ color: "white", textAlign: "left" }}>confirm password</p>
        <div style={{ display: "flex" }}>
          <InputField
            placeholder="비밀번호를 입력해주세요"
            value={configPwd}
            onChange={handleConfigPwd}
            type="password"
          ></InputField>
        </div>
      </InputFieldWrapper>

      <InputFieldWrapper>
        <p style={{ color: "white", textAlign: "left" }}>email</p>
        <div style={{ display: "flex" }}>
          <InputField
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleEmail}
          ></InputField>
          <ConfirmBox>Confirm</ConfirmBox>
        </div>
      </InputFieldWrapper>

      <ButtonBox onClick={register}>Sign Up</ButtonBox>
    </div>
  );
}

const InputField = styled.input`
  height: 50px;
  border: none;
  width: 62%;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  display: block;
  /* margin: 0 auto; */
`;

const InputFieldWrapper = styled.div`
  /* display: inline-block; */
  margin: 0 30px;

  /* border: 1px solid yellow; */
`;

const TitleBox = styled.div`
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const ButtonBox = styled.div`
  background-color: #841bc5;
  width: 320px;
  height: 50px;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 80px;
`;

const ConfirmBox = styled.div`
  background-color: #841bc5;
  font-size: 0.8rem;
  width: 22%;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
`;
