import React from "react";
import styled from "styled-components";

export default function MainHome() {
  return (
    <div style={{ width: "100%" }}>
      <GridBox>
        <Item>itemdd1</Item>
        <Item>item2d</Item>
        <Item>item3</Item>
        <Item>itemdd1</Item>
        <Item>item2d</Item>
        <Item>itedm3</Item>
        <Item>itemdd1</Item>
        <Item>item2d</Item>
        <Item>item3</Item>
      </GridBox>
    </div>
  );
}

const GridBox = styled.div`
  /* border: 3px solid red; */
  width: 360px;
  /* margin: 0 auto; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  /* justify-content: center; */
  /* align-items: center; */
  gap: 10px;
  margin: 0 auto;
`;

const Item = styled.div`
  /* padding: 4rem; */
  /* border: 0.01rem solid gray; */
  background: #f4f4f4;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
`;
