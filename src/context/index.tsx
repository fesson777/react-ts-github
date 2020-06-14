import React, { useReducer, createContext, ReactNode } from "react";
import { reducer } from "./reducer";
import axios from "axios";
import { GET_USER, GET_REPOS, SET_LOADING } from "./types";
import { Repo } from "../interfaces";

interface IContextValue {
  setLoading: () => void;
  getRepos: (query: string) => void;
  getUser: (name: string) => void;
  user: Obj;
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
  user: Obj;
  repos: Repo[];
  loading: boolean;
  headers: {
    link: string;
  };
};

export const ContextProvider = ({ children }: IContextProvider) => {
  const initialState: State = {
    user: {},
    loading: false,
    repos: [],
    headers: {
      link: "",
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  const getRepos = async (query: string) => {
    // console.log("getRepos -> query", query);
    setLoading();

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

  const getUser = async (name: string) => {
    setLoading();
    const response = await axios.get(`https://api.github.com/users/${name}`);
    dispatch({
      type: GET_USER,
      payload: response.data,
    });
  };

  const { user, loading, repos, headers } = state;

  return (
    <Context.Provider
      value={{
        setLoading,
        getRepos,
        getUser,
        user,
        loading,
        repos,
        headers,
      }}
    >
      {children}
    </Context.Provider>
  );
};
