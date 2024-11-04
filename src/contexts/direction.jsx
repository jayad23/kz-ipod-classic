import { createContext, useReducer } from "react";

const initialState = {
  direction: "next",
};

const directionReducer = (state, action) => {
  switch (action.type) {
    case "SET_DIRECTION":
      return {
        ...state,
        direction: action.payload,
      };
    default:
      return state;
  }
};

const DirectionContext = createContext();

function DirectionProvider({ children }) {
  const [state, dispatch] = useReducer(directionReducer, initialState);

  return (
    <DirectionContext.Provider value={{ state, dispatch }}>
      {children}
    </DirectionContext.Provider>
  );
}

export { DirectionProvider, DirectionContext };
