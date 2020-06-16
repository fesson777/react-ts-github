import React, {
  useContext,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../context";
import Button from "./Button";
import { defaultQuery, per_page } from "../const";

export const Search = () => {
  const [query, setQuery] = useState("");

  const { search, pathname } = useLocation();

  // onMount
  useEffect(() => {
    if (search) {
      const q = search.slice(1);
      const arr = q.split("&");

      const str = arr.find((str) => {
        return str.indexOf("q=") === 0;
      });
      if (str) {
        const valueF5 = str.slice(2);
        setQuery(valueF5);
      }

      ctx.getRepos(q);
    } else {
      ctx.getRepos(defaultQuery);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ctx = useContext(Context);

  const submit = () => {
    const value = query.trim();
    if (value) {
      const q = `q=${value}&sort=stars&per_page=${per_page}`;
      window.history.pushState(null, "", `${pathname}?${q}`);
      ctx.getRepos(q);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleClick = () => {
    submit();
  };

  const handleClear = () => {
    setQuery("");
    ctx.getRepos(defaultQuery);
    window.history.pushState(null, "", pathname);
  };

  return (
    <div className="container">
      <div className="c-input">
        <input
          type="text"
          className=""
          placeholder="Название репозитория"
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Button variant="primary" onClick={handleClick} type="button">
          Поиск
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Сбросить фильтр
        </Button>
      </div>
    </div>
  );
};
