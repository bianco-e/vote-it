import { createContext, useReducer } from "react";
import { Context, Option, State } from "../interfaces";
import { SET_ID, SET_MAX, SET_OPTIONS } from "./types";

const initialFunctions = {
  setId: (id: string) => undefined,
  setMax: (max: number) => undefined,
  setOptions: (options: Option[]) => undefined,
};

const initialState: State = {
  id: "",
  max: 0,
  options: [],
};

export const StoreContext = createContext<Context>({
  ...initialFunctions,
  state: initialState,
});

const reducer = (state: State, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_ID:
      return {
        ...state,
        id: action.payload,
      };
    case SET_MAX:
      return {
        ...state,
        max: action.payload,
      };
    case SET_OPTIONS:
      return {
        ...state,
        options: action.payload,
      };
    default:
      return state;
  }
};

export default function Store({ children }: { children: JSX.Element }) {
  const [contextState, dispatch] = useReducer(reducer, initialState);

  const setId = (payload: string) => dispatch({ type: SET_ID, payload });
  const setMax = (payload: number) => dispatch({ type: SET_MAX, payload });
  const setOptions = (payload: Option[]) =>
    dispatch({ type: SET_OPTIONS, payload });

  return (
    <StoreContext.Provider
      value={{ setId, setMax, setOptions, state: contextState }}
    >
      {children}
    </StoreContext.Provider>
  );
}
