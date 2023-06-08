import React from "react";
import "../../App.css";
import logo from "../../assets/logo_vibey.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Start() {
  return (
    <div className="App">
      <ImgWrapper>
        <img src={logo} style={{ width: "180px", marginBottom: "20px" }}></img>
        <div
          style={{
            fontSize: "3rem",
            fontFamily: "Times New Roman, Times, serif",
          }}
        >
          Vibey
        </div>
        <TextWrapper>
          <Link
            to="/auth/login"
            style={{ textDecoration: "none", color: "#ffffff" }}
          >
            {" "}
            <div>login</div>
          </Link>

          <div>|</div>
          <Link
            to="/auth/sign-up"
            style={{ textDecoration: "none", color: "#ffffff" }}
          >
            <div>sign up</div>
          </Link>
        </TextWrapper>
      </ImgWrapper>
    </div>
  );
}

const ImgWrapper = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  color: #ffffff;
`;

const TextWrapper = styled.div`
  /* border: 1px solid yellow; */
  margin: 10px;
  display: flex;
  margin-top: 120px;
  justify-content: space-between;
  cursor: pointer;
`;
