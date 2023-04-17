import React from "react";

import styled from "styled-components";

const Title = (props) => {
  return (
    <div>
      <TodayText>{props.title}</TodayText>
    </div>
  );
};

const TodayText = styled.div`
  position: absolute;
  height: 44px;
  left: 36px;
  top: 60px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 44px;
  /* identical to box height */

  color: #ffffff;
`;

export default Title;
