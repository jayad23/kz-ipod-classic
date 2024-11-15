import classnames from "classnames";
import { useContext } from "react";
import ReactPlayer from "react-player";
import { AppearanceContext } from "../../contexts/appearance";
import { getRandomIndex } from "../../utils/get-random-index";

const onReturnScreenDimensions = (dimensions) => {
  if (dimensions === "wide") {
    return "w-full h-[77%]";
  } else if (dimensions === "small") {
    return "w-full h-[71%]";
  }
};

const PlayerScreen = ({ isPlaying, currentSong, currentCollection, dispatchPlay, loop, shuffle }) => {
  const { dimensions } = useContext(AppearanceContext);

  const afterCurrentSongEnds = () => {
    if (currentCollection && currentCollection.length > 1) {
      if (!shuffle) {
        const prevIndex = currentSong.index + 1;
        const nextIndex = prevIndex === currentCollection.length ? 0 : prevIndex;
        if (nextIndex === 0 && loop === "none") {
          dispatchPlay({ type: "PLAY_PAUSE" });
          return;
        }
        dispatchPlay({ type: "SET_CURRENT_SONG", payload: currentCollection[nextIndex] });
        return;
      }
      if (shuffle) {
        const randomIndex = getRandomIndex(currentCollection.length);
        dispatchPlay({ type: "SET_CURRENT_SONG", payload: currentCollection[randomIndex] });
      }
    }
  };

  const onCaptureVideoDuration = (duration) => {
    dispatchPlay({ type: "SET_DURATION", payload: duration });
  };

  const onCaptureLoadedProgress = (args) => {
    dispatchPlay({ type: "SET_LOADED_PROGRESS", payload: args.playedSeconds });
  };

  // const onCapturePlay = (args) => {
  //   console.log("onCapturePlay", args);
  // };

  return (
    <div className={classnames(onReturnScreenDimensions(dimensions.size), "hidden")}>
      <ReactPlayer
        controls
        width="0%"
        height="0%"
        playing={isPlaying}
        loop={loop === "one"}
        //onPlay={onCapturePlay}
        className="react-player"
        url={currentSong?.videoUrl}
        onEnded={afterCurrentSongEnds}
        onDuration={onCaptureVideoDuration}
        onProgress={onCaptureLoadedProgress}
      />
    </div>
  );
};

export default PlayerScreen;
