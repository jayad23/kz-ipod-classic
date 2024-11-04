import { createContext, useReducer } from "react";

const initialState = {
  isPlaying: false
};

const PlayerContext = createContext(initialState);

const playerReducer = (state, action) => {
  switch (action.type) {
    case "PLAY_PAUSE":
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    default:
      return state;
  }
};

const PlayerProvider = ({ children }) => {
  const [statePlay, dispatchPlay] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={{ statePlay, dispatchPlay }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };