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

  const checkId = (e) => {
    axios
      .post("http://localhost:5000/valid/exists/id", {
        id: id,
      })
      .then((res) => {
        console.log("res.data:", res.data);
        if (res.data.result == true) {
          console.log("사용 가능한 아이디");
          alert("사용 가능한 아이디입니다.");
          setIdValid(true);
        } else {
          console.log("중복된 아이디 존재");
          alert(res.data.messsage);
          setIdValid(false);
        }
      })
      .catch((err) => {
        console.log("중복확인 실패: ", err);
      });
  };

  // const checkEmail = (e) => {
  //   axios
  //     .post("http://localhost:5000/valid/exists/email", {
  //       email: email,
  //     })
  //     .then((res) => {
  //       console.log("res.data:", res.data);
  //       if (res.data.result == true) {
  //         console.log("이메일 인증 완료");
  //         alert("인증완료");
  //         setEmailValid(true);
  //       } else {
  //         console.log("실패");
  //         alert(res.data.message);
  //         setEmailValid(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("에러:", err);
  //     });
  // };

  const checkNickname = (e) => {
    axios
      .post("http://localhost:5000/valid/exists/nickname", {
        nickname: name,
      })
      .then((res) => {
        console.log("res.data :", res.data);
        if (res.data.result == true) {
          console.log("사용 가능한 닉네임");
          alert("사용 가능한 닉네임입니다.");
          setNameValid(true);
        } else {
          console.log(res.data.message);
          alert("중복된 닉네임이 존재합니다.");
          setNameValid(false);
        }
      })
      .catch((err) => {
        console.log("중복확인 실패:", err);
      });
  };

  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  const checkRegex = (e) => {
    const regexPwd =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}$/;
    //비밀번호 : 8~16자 대문자, 소문자, 숫자, 특수문자 필수!
    if (regexPwd.test(pwd)) {
      setPwdValid(true);
      console.log("정규표현식 일치");
    } else {
      setPwdValid(false);
      console.log("정규표현식 불일치");
    }
  };

  const handleConfigPwd = (e) => {
    setConfigPwd(e.target.value);
  };

  const checkPwd = (e) => {
    if (pwd == configPwd) {
      setConfigPwdValid(true);
      console.log("비밀번호 확인 완료");
    } else {
      setConfigPwdValid(false);
      console.log("입력하신 비밀번호와 일치하지 않습니다.");
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regexEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regexEmail.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const sendEmail = (e) => {
    axios
      .post("http://localhost:5000/valid/email/send", {
        email: email,
      })
      .then((res) => {
        if (res.data.result == false) {
          alert(res.data.message);
        } else {
          console.log("이메일 인증 메일이 전송되었습니다.");
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  const configEmail = (e) => {
    axios
      .post("http://localhost:5000/valid/email/check", {
        email: email,
      })
      .then((res) => {
        if (res.data.result == true) {
          console.log("인증 완료");
          alert(res.data.message);
          setEmailValid(true);
        } else {
          console.log(res.data.message);
          console.log("인증 실패");
        }
      })
      .catch((err) => {
        console.log(err);
        setEmailValid(false);
      });
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
    if ((idValid && nameValid && emailValid && pwdValid, configPwdValid)) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, nameValid, pwdValid, emailValid]);

  return (
    <div style={{ width: "100%", height: "100%", margin: ") auto" }}>
      <TitleBox>Sign Up</TitleBox>
      <InputFieldWrapper>
        <p style={{ color: "white", textAlign: "left" }}>nickname</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InputField
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={handleName}
          ></InputField>
          <ConfirmBox onClick={checkNickname}>Confirm</ConfirmBox>
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
          <ConfirmBox onClick={checkId}>Confirm</ConfirmBox>
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
          <ConfirmBox
            onClick={checkRegex} /* style={{ backgroundColor: "#5e5e5e" }}*/
          >
            confirm
          </ConfirmBox>
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
          <ConfirmBox onClick={checkPwd}>Confirm</ConfirmBox>
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
          <ConfirmBox onClick={sendEmail}>Send</ConfirmBox>
          <ConfirmBox onClick={configEmail}>Confirm</ConfirmBox>
        </div>
      </InputFieldWrapper>

      <ButtonBox onClick={register}>Sign Up</ButtonBox>
    </div>
  );
}

const InputField = styled.input`
  height: 50px;
  border: none;
  width: 70%;
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
  margin-top: 50px;
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
  width: 30%;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
`;
