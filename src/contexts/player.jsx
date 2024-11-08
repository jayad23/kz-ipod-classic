import { createContext, useEffect, useReducer } from "react";
import { onFetcher } from "../api/fetcher";
import { useQuery } from "@tanstack/react-query";
import PlayerScreen from "../components/player-screen/player-screen";

const initialState = {
  isPlaying: false,
  albums: [],
  currentCollection: [],
  currentSong: {}
};

const PlayerContext = createContext(initialState);

const playerReducer = (state, action) => {
  switch (action.type) {
    case "PLAY_PAUSE":
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };

    case "SET_ALBUMS":
      return {
        ...state,
        albums: action.payload,
      };
    default:
      return state;
  }
};

const PlayerProvider = ({ children }) => {
  const [statePlay, dispatchPlay] = useReducer(playerReducer, initialState);
  //const { data } = useQuery({ queryKey: ['playlist'], queryFn: async () => onFetcher("/music/playlists") });
  const data = null;

  useEffect(() => {
    if (data) {
      dispatchPlay({ type: "SET_ALBUMS", payload: data.data });
    }

  }, [data]);

  const payload = {
    statePlay,
    albums: statePlay.albums,
    currentCollection: statePlay.currentCollection,
    currentSong: statePlay.currentSong,
    dispatchPlay,
  };

  return (
    <PlayerContext.Provider value={payload}>
      <PlayerScreen
        url="https://www.youtube.com/watch?v=vVXIK1xCRpY"
        isPlaying={statePlay.isPlaying}
      />
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };