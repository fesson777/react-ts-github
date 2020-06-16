import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = ({ children, variant, ...props }: IButtonProps) => (
  <button {...props}>{children}</button>
);

export default styled(Button)<IButtonProps>`
  color: white;
  background-color: ${({ variant }) => {
    if (variant === "primary") {
      return "blue";
    }
    if (variant === "secondary") {
      return "grey";
    }
    return "black";
  }};
  margin: 0 8px;
  padding: 8px 12px;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    outline: 1px solid black;
  }
`;
