import { createContext, useReducer } from "react";

const initialState = {
  theme: {
    name: "default",
    config: {
      body: "#bbbfc2",
      text: "",
      wheel: "#FFFAF0"
    }
  },
  dimensions: {
    size: "small",
    // width: "100%",
    // height: "92vh",
    width: "360px",
    height: "600px",
  }
};
const AppearanceContext = createContext(initialState);

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload
      };
    case "SET_DIMENSIONS":
      return {
        ...state,
        dimensions: action.payload
      };
    default:
      return state;
  }
};

export const AppearanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return (
    <AppearanceContext.Provider
      value={{
        theme: state.theme,
        dimensions: state.dimensions,
        setTheme: dispatch
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
};

export default AppearanceProvider;
export { AppearanceContext };