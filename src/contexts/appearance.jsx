import { createContext, useReducer } from "react";

const initialState = {
  theme: {
    name: "default",
    config: {
      background: "rgb(17 24 39)",
      body: "#bbbfc2",
      text: "#5f5959",
      wheel: "#FFFAF0"
    }
  },
  dimensions: {
    size: "small",
    width: "360px",
    height: "600px",
    circumference: "15rem",
    padding: "1.25rem",
    borderRadius: "20px",
    marginTop: 0,
    center_button: {
      top: "40.5px",
      circumference: "80px"
    }
  }
};
const AppearanceContext = createContext(initialState);

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "PREVIEW":
      return {
        ...state,
        theme: {
          ...state.theme,
          ...action.payload
        }
      };
    case "PREVIEW_DIMENSIONS":
      return {
        ...state,
        dimensions: {
          ...action.payload
        }
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