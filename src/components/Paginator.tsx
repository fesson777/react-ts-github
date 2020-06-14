import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../context";
import Pager from "./Pager";
import { getPageFromSearch } from "../helpers";

type PaginationMap = {
  [key: string]: string;
};

export const Paginator = () => {
  const { headers, getRepos } = useContext(Context);
  const [map, setMap] = useState<PaginationMap>({});
  // const lastPage = useRef(1);
  // const currentPage = useRef(1);
  // const pages = useRef(1);
  const [pagerParams, setPagerParams] = useState({
    lastPage: 1,
    currentPage: 1,
    pages: 1,
  });
  console.log("Paginator -> pagerParams", pagerParams);

  const { pathname } = useLocation();

  useEffect(() => {
    let { lastPage, pages } = pagerParams;
    const { link } = headers;
    if (link) {
      const arr = link.split(",");
      const obj = arr.reduce((acc: PaginationMap, item: string) => {
        const [url, rel] = item.split(";");
        if (rel.includes("next")) {
          acc["next"] = url;
        }
        if (rel.includes("prev")) {
          acc["prev"] = url;
        }
        if (rel.includes("last")) {
          acc["last"] = url;
        }
        if (rel.includes("first")) {
          acc["first"] = url;
        }
        return acc;
      }, {});

      const url_last = obj["last"];
      if (url_last) {
        const arr_params = obj["last"].split("&");
        const param = arr_params.find((param) => {
          return param.indexOf("page") === 0;
        });
        if (param) {
          const last = param.slice(5, -1);
          lastPage = Number(last);
        }
      }

      if (lastPage > 10) {
        pages = 10;
      } else {
        pages = lastPage;
      }

      const { search } = window.location;
      const currentPage = getPageFromSearch(search);

      setMap(obj);
      setPagerParams((state) => ({ ...state, lastPage, pages, currentPage }));
      console.log("Paginator -> obj", obj);
    }
  }, [headers]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePagerClick = (page: string | number) => {
    console.log("handlePagerClick -> page", page);
    let { currentPage, lastPage } = pagerParams;
    if (typeof page === "string") {
      if (page === "first") {
        currentPage = 1;
      }
      if (page === "last") {
        currentPage = lastPage;
      }
      if (page === "prev") {
        if (currentPage > 1) {
          currentPage--;
        }
      }
      if (page === "next") {
        if (currentPage < lastPage) {
          currentPage++;
        }
      }
      const url = map[page];
      if (url) {
        const index = url.indexOf("?");
        const q = url.slice(index + 1, -1);
        window.history.pushState(null, "", `${pathname}?${q}`);
        getRepos(q);
        console.log("handlePagerClick -> q-text", q);
      }
    } else if (typeof page === "number") {
      currentPage = page;
      let q = "";
      const url = Object.values(map)[0];
      const index = url.indexOf("?");
      const query = url.slice(index + 1);

      if (query.includes("&page")) {
        const arr = query.split("&");
        const arr2 = arr.map((item) => {
          if (item.indexOf("page") === 0) {
            return `page=${page}`;
          } else {
            return item;
          }
        });
        q = arr2.join("&");
      } else {
        q = `${query}&page=${page}`;
      }

      window.history.pushState(null, "", `${pathname}?${q}`);
      getRepos(q);
      setPagerParams((state) => ({ ...state, currentPage }));
      console.log("handlePagerClick -> q-number", q);
    }
  };

  return (
    <Pager
      pages={pagerParams.pages}
      currentPage={pagerParams.currentPage}
      onClick={handlePagerClick}
    />
  );
};
