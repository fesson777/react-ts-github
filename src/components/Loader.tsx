import React from "react";
import styled from "styled-components";

export default function Loader() {
  return (
    <StyledLoader>
      <p>Загрузка...</p>
    </StyledLoader>
  );
}
const StyledLoader = styled.div`
  margin: 0 auto;
  p {
    text-align: center;
    color: red;
    font-size: 24px;
  }
`;
