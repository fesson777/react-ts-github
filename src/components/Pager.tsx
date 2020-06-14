import React, { MouseEvent } from "react";
import styled from "styled-components";
// import { per_page } from "../const";
import clsx from "clsx";

interface SpanElement extends HTMLSpanElement {
  id: string;
}

interface IPagerProps {
  onClick: (page: string | number) => void;
  currentPage: number;
  pages: number;
}

const Pager = ({ pages, currentPage, onClick }: IPagerProps) => {
  console.log("Pager -> currentPage", currentPage);
  const handleClick = (e: MouseEvent<SpanElement>) => {
    const id = (e.target as SpanElement).id;

    switch (id) {
      case "first":
      case "last":
      case "prev":
      case "next":
        onClick(id);
        break;
      default: {
        const page = Number(id.slice(1));
        onClick(page);
      }
    }
  };

  return (
    <div className="paginator" onClick={handleClick}>
      <span id="first">first</span>
      <span id="prev">prev</span>
      {new Array(pages).fill("").map((_, i) => {
        return (
          <span
            key={i}
            id={`p${i + 1}`}
            className={clsx({ active: currentPage === i + 1 })}
          >
            {i + 1}
          </span>
        );
      })}
      <span id="next">next</span>
      <span id="last">last</span>
    </div>
  );
};

const StyledPager = styled(Pager)``;

export default StyledPager;
