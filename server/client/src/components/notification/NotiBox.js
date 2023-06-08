import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

const NotiBox = (props) => {
  const [opacity, setOpacity] = useState(100);

  const { onClose } = props;

  const softRemover = () => {
    if (opacity > 96) {
      setTimeout(() => {
        setOpacity(opacity - 1);
      }, 100);
    } else if (opacity > 5) {
      setTimeout(() => {
        setOpacity(opacity - 8);
      }, 50);
    }
  };

  useEffect(() => {
    softRemover();
  }, [softRemover]);

  return (
    <NotiDiv opacity={`${opacity}%`}>
      <NotificationBox>{props.noti}</NotificationBox>
      <button onClick={() => onClose(false)}>확인</button>
    </NotiDiv>
  );
};

const NotiDiv = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 100px;
  border-radius: 15px;
  background: rgba(217, 217, 217, 0.96);
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-weight: 600;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const NotificationBox = styled.div`
  margin: 10px;
  /* position: absolute; */
  /* display: flex;
  margin: 0 auto;
  width: 400px;
  height: 200px; */
`;

export default NotiBox;
