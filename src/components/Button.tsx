import React, { ReactNode } from "react";
import styled from "styled-components";

interface IButton {
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: IButton) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

const StyledButton = styled.button`
  color: white;
  background-color: blue;
  margin: 0 8px;
  padding: 4px 8px;
  border-radius: 4px;
`;

export default Button;
