import React, { ReactNode } from "react";
import styled from "styled-components";

interface IButton {
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: IButton) => (
  <button onClick={onClick}>{children}</button>
);

const StyledButton = styled(Button)`
  color: white;
  background-color: blue;
`;

export default StyledButton;
