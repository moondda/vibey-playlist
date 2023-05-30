import React from "react";
import styled from "styled-components";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LockIcon from "@mui/icons-material/Lock";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

export default function SettingList() {
  return (
    <div style={{ position: "absolute", top: "192px" }}>
      <Link to="/settings/profile-edit" style={{ textDecoration: "none" }}>
        <ItemList>
          <ManageAccountsIcon></ManageAccountsIcon>
          <SpaceList>
            <ItemText>프로필 수정</ItemText>

            <NavigateNextIcon></NavigateNextIcon>
          </SpaceList>
        </ItemList>
      </Link>
      <Link to="/settings/password-edit" style={{ textDecoration: "none" }}>
        <ItemList>
          <LockIcon></LockIcon>
          <SpaceList>
            <ItemText>비밀번호 변경</ItemText>

            <NavigateNextIcon></NavigateNextIcon>
          </SpaceList>
        </ItemList>
      </Link>
      <Link to="" style={{ textDecoration: "none" }}>
        <ItemList>
          <InfoIcon></InfoIcon>
          <SpaceList>
            <ItemText>정보</ItemText>

            <NavigateNextIcon></NavigateNextIcon>
          </SpaceList>
        </ItemList>
      </Link>
    </div>
  );
}

const ItemList = styled.div`
  /* position: absolute; */
  /* height: 40px; */
  /* margin: 10px; */
  /* border: 3px solid red; */
  /* left: 32px; */
  /* top: 192px; */
  margin-left: 32px;
  display: flex;
  align-items: center;
  color: white;
  padding-left: 6px;
  border-bottom: 1px solid #8e8e8e;
`;

const ItemText = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 44px;
  color: #ffffff;
  margin-left: 13px;
  margin-right: 13px;
`;

const SpaceList = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid yellow; */
`;
