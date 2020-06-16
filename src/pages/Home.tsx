import React, { useContext } from "react";
import { Search } from "../components/Searh";
import { Context } from "../context";
import ReposTable from "../components/Repos";
import { Paginator } from "../components/Paginator";
import Flex from "../components/Flex";
import Loader from "../components/Loader";
import styled from "styled-components";

export default function Home() {
  const { loading } = useContext(Context);
  return (
    <StyledHome>
      <Search />
      <Flex>{loading ? <Loader /> : <ReposTable />}</Flex>
      <Paginator />
    </StyledHome>
  );
}

const StyledHome = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
