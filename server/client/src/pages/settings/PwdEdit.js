import React from "react";
import styled from "styled-components";

const PwdEdit = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <InputFieldWrapper>
        <EditText style={{ color: "white", textAlign: "left" }}>
          기존 비밀번호
        </EditText>
        <div style={{ display: "flex" }}>
          <InputField placeholder="기존 비밀번호"></InputField>
        </div>
      </InputFieldWrapper>
      <InputFieldWrapper>
        <EditText style={{ color: "white", textAlign: "left" }}>
          새 비밀번호
        </EditText>
        <div style={{ display: "flex" }}>
          <InputField placeholder="새 비밀번호"></InputField>
        </div>
      </InputFieldWrapper>
      <InputFieldWrapper>
        <EditText style={{ color: "white", textAlign: "left" }}>
          새 비밀번호 확인
        </EditText>
        <div style={{ display: "flex" }}>
          <InputField placeholder="새 비밀번호 확인"></InputField>
        </div>
      </InputFieldWrapper>
      <ButtonBox>저장</ButtonBox>
    </div>
  );
};

export default PwdEdit;

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
