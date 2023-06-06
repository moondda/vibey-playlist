import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

const PwdEdit = (props) => {
  const [confirmPwd, setConfirmPwd] = useState("");
  const [confirmPwdValid, setConfirmPwdValid] = useState(false);
  const [changedPwd, setChangedPwd] = useState("");
  const [changedPwdValid, setChangedPwdValid] = useState(false);
  const [rechangedPwd, setRechangedPwd] = useState("");

  const [notAllow, setNotAllow] = useState(true);

  const checkPwd = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    axios
      .post(
        "http://localhost:5000/setting/check",
        {
          pw: confirmPwd,
        },
        {
          // withCredentials: true, // 쿠키를 요청 헤더에 포함시킴
          headers: {
            Authorization: `${sessionStorage.getItem("user_token")}`,
          },
        }
      )
      .then((res) => {
        // console.log("req:", req);
        console.log(confirmPwd);
        console.log("token:", sessionStorage.getItem("user_token"));
        // console.log("checkPwd시작", res);
        console.log("res.data :", res.data);
        if (res.data.result === true) {
          alert(res.data.message);
          console.log(res.data.message);
          setConfirmPwdValid(true);
        } else {
          console.log(res.data.message);
          setConfirmPwdValid(false);
        }
      })
      .catch((err) => {
        console.log("확인 실패:", err);
      });
  };

  const saveChangedPwd = (e) => {
    console.log(changedPwd, rechangedPwd);
    if (changedPwd == rechangedPwd) {
      axios
        .post(
          "http://localhost:5000/setting/password",
          {
            pw: changedPwd,
          },
          {
            // withCredentials: true, // 쿠키를 요청 헤더에 포함시킴
            headers: {
              Authorization: `${sessionStorage.getItem("user_token")}`,
            },
          }
        )
        .then((res) => {
          console.log("res.data:", res.data);
          if (res.data.result == true) {
            alert(res.data.message);
            console.log(res.data.message);
            setChangedPwdValid(true);
          } else {
            console.log(res.data.message);
            alert(res.data.message);
            setChangedPwdValid(false);
          }
        })
        .catch((err) => {
          console.log("확인 실패:", err);
        });
    } else {
      alert("새로 입력하신 비밀번호가 일치하지 않습니다.");
    }
  };
  //asdf//Chae0606!

  // useEffect(() => {
  //   if (confirmPwdValid && changedPwdValid) {
  //     setNotAllow(false);
  //     return;
  //   }
  //   setNotAllow(true);
  // }, [confirmPwdValid, changedPwdValid]);

  return (
    <div style={{ width: "100%" }}>
      <InputFieldWrapper>
        <EditText style={{ color: "white", textAlign: "left" }}>
          기존 비밀번호
        </EditText>
        <div style={{ display: "flex" }}>
          <InputField
            placeholder="기존 비밀번호를 입력해주세요"
            type="password"
            value={confirmPwd}
            onChange={(e) => {
              setConfirmPwd(e.target.value);
            }}
          ></InputField>
          <ConfirmBox
            onClick={(e) => {
              checkPwd();
            }}
          >
            확인
          </ConfirmBox>
        </div>
      </InputFieldWrapper>
      <InputFieldWrapper>
        <EditText style={{ color: "white", textAlign: "left" }}>
          새 비밀번호
        </EditText>
        <div style={{ display: "flex" }}>
          <InputField
            placeholder="새 비밀번호"
            type="password"
            value={changedPwd}
            onChange={(e) => {
              setChangedPwd(e.target.value);
            }}
          ></InputField>
        </div>
      </InputFieldWrapper>
      <InputFieldWrapper>
        <EditText style={{ color: "white", textAlign: "left" }}>
          새 비밀번호 확인
        </EditText>
        <div style={{ display: "flex" }}>
          <InputField
            placeholder="새 비밀번호 확인"
            type="password"
            value={rechangedPwd}
            onChange={(e) => {
              setRechangedPwd(e.target.value);
            }}
          ></InputField>
        </div>
      </InputFieldWrapper>
      <ButtonBox onClick={saveChangedPwd}>저장</ButtonBox>
    </div>
  );
};

export default PwdEdit;

const ConfirmBox = styled.div`
  background-color: #841bc5;
  font-size: 0.8rem;
  width: 40%;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const ButtonBox = styled.div`
  background-color: #841bc5;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 100px;
  width: 114px;
  height: 46px;

  border-radius: 15px;
`;

const EditText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
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
