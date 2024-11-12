import { createContext, useEffect, useReducer } from "react";
import { onFetcher } from "../api/fetcher";
import { useQuery } from "@tanstack/react-query";
import PlayerScreen from "../components/player-screen/player-screen";

const initialState = {
  isPlaying: false,
  albums: [],
  currentCollection: [],
  currentSong: null,
  duration: 0,
  loadedProgress: 0,
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

    case "SET_CURRENT_COLLECTION":
      return {
        ...state,
        currentCollection: action.payload,
        currentSong: action.payload[0],
        //duration: 0,
        //isPlaying: true
      };

    case "SET_CURRENT_SONG":
      return {
        ...state,
        currentSong: action.payload,
        duration: 0
      };

    case "SET_DURATION":
      return {
        ...state,
        duration: action.payload,
      };

    case "SET_LOADED_PROGRESS":
      return {
        ...state,
        loadedProgress: action.payload,
      };

    default:
      return state;
  }
};

const PlayerProvider = ({ children }) => {
  const [statePlay, dispatchPlay] = useReducer(playerReducer, initialState);
  const { data } = useQuery({ queryKey: ['playlist'], queryFn: async () => onFetcher("/music/playlists") });

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
        {...statePlay}
        dispatchPlay={dispatchPlay}
      />
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };