import React, { useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import styled from "styled-components";
import { isLoginState } from "./RecoilUser";

export default function LogOut() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  useEffect(() => {
    if (sessionStorage.getItem("user_token") === null) {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      setIsLogin(false);
    } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true);
    }
  });

  const onLogout = () => {
    sessionStorage.removeItem("user_token");
    document.location.href = "/auth/login";
  };

  return (
    <LogoutContainer>
      <button onClick={onLogout}>로그아웃</button>
    </LogoutContainer>
  );
}

const LogoutContainer = styled.div`
  /* border: 1px solid yellow; */
  color: white;
  position: absolute;
  top: 65px;
  right: 40px;
`;
