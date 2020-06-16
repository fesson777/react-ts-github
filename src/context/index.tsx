import React, { useReducer, createContext, ReactNode } from "react";
import { reducer } from "./reducer";
import axios from "axios";
import { GET_CONTR, GET_REPOS, SET_LOADING } from "./types";
import { Repo } from "../interfaces";

type User = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
};

interface IContextValue {
  setLoading: (loading: boolean) => void;
  getRepos: (query: string) => void;
  getContributors: (repoName: string, login: string) => void;
  users: Array<User>;
  loading: boolean;
  repos: Repo[];
  headers: {
    link: string;
  };
}

export const Context = createContext({} as IContextValue);

interface IContextProvider {
  children: ReactNode;
}

type State = {
  users: Array<{}>;
  repos: Repo[];
  loading: boolean;
  headers: {
    link: string;
  };
};

export const ContextProvider = ({ children }: IContextProvider) => {
  const initialState: State = {
    users: [],
    loading: false,
    repos: [],
    headers: {
      link: "",
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = (loading: boolean) =>
    dispatch({ type: SET_LOADING, payload: loading });

  const getRepos = async (query: string) => {
    // console.log("getRepos -> query", query);
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/search/repositories?${query}`
    );
    // console.log("getRepos -> response", response);

    const payload = {
      headers: response.headers,
      repos: response.data.items,
    };
    dispatch({
      type: GET_REPOS,
      payload: payload,
    });
  };

  const getContributors = async (repoName: string, login: string) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repoName}/${login}/contributors`
      );
      dispatch({
        type: GET_CONTR,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_CONTR,
        payload: [],
      });

      setLoading(false);
      console.error("getContributors -> error", error);
    }
  };

  const { users, loading, repos, headers } = state;

  return (
    <Context.Provider
      value={{
        setLoading,
        getRepos,
        getContributors,
        users,
        loading,
        repos,
        headers,
      }}
    >
      {children}
    </Context.Provider>
  );
};
