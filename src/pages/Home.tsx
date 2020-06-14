import React, { useContext } from "react";
import { Search } from "../components/Searh";
import { Context } from "../context";
import ReposTable from "../components/Repos";
import { Paginator } from "../components/Paginator";
import Flex from "../components/Flex";
import Loader from "../components/Loader";

export default function Home() {
  const { loading } = useContext(Context);
  return (
    <React.Fragment>
      <Search />
      <Flex>{loading ? <Loader /> : <ReposTable />}</Flex>
      <Paginator />
    </React.Fragment>
  );
}

// "https://api.github.com/search/repositories?q=stars:>1000&per_page=10"
// `https://api.github.com/search/repositories?q=${value}&page=10&per_page=10&sort=stars`
// `https://api.github.com/users/${name}/repos?per_page=7`
