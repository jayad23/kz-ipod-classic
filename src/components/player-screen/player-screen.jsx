//import { useContext } from "react";
import classnames from "classnames";
import { useContext } from "react";
import ReactPlayer from "react-player";
import { AppearanceContext } from "../../contexts/appearance";
// import { PlayerContext } from "../../contexts/player";
// import { AppearanceContext } from "../../contexts/appearance";

const onReturnScreenDimensions = (dimensions) => {
  if (dimensions === "wide") {
    // the screen is big
    //return "w-full h-[94%]";
    return "w-full h-[77%]";
  } else if (dimensions === "small") {
    // the screen is small
    return "w-full h-[71%]";
  }
};

const PlayerScreen = ({ isPlaying, currentSong, currentCollection, dispatchPlay }) => {
  const { dimensions } = useContext(AppearanceContext);

  const afterCurrentSongEnds = () => {
    if (currentCollection && currentCollection.length > 1) {
      const prevIndex = currentSong.index + 1;
      const nextIndex = prevIndex === currentCollection.length ? 0 : prevIndex;
      if (nextIndex === 0) {
        dispatchPlay({ type: "PLAY_PAUSE" });
        return;
      }
      dispatchPlay({ type: "SET_CURRENT_SONG", payload: currentCollection[nextIndex] });
    }
  };

  const onCaptureVideoDuration = (duration) => {
    dispatchPlay({ type: "SET_DURATION", payload: duration });
  };

  return (
    <div className={classnames(onReturnScreenDimensions(dimensions.size), "hidden")}>
      <ReactPlayer
        controls
        width="0%"
        height="0%"
        playing={isPlaying}
        className="react-player"
        url={currentSong?.videoUrl}
        onEnded={afterCurrentSongEnds}
        onDuration={onCaptureVideoDuration}
      />
    </div>
  );
};

export default PlayerScreen;
