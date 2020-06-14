import { GET_REPOS, GET_USER, SET_LOADING } from "./types";

type Action = {
  type: string;
  payload?: any;
};

type ReducerState = Obj;

interface IHandlers {
  [action: string]: (state: ReducerState, action: Action) => ReducerState;
}

const handlers: IHandlers = {
  [GET_REPOS]: (state, action) => ({
    ...state,
    repos: action.payload.repos,
    headers: action.payload.headers,
    loading: false,
  }),
  [GET_USER]: (state, action) => ({
    ...state,
    user: action.payload,
    loading: false,
  }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  DEFAULT: (state) => state,
};

export const reducer = (state: ReducerState, action: Action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
