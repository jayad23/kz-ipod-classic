//import { useContext } from "react";
import classnames from "classnames";
import ReactPlayer from "react-player";
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

const PlayerScreen = ({ url = "https://www.youtube.com/watch?v=jdYJf_ybyVo", size = "wide", isPlaying = false }) => {
  // const { statePlay } = useContext(PlayerContext);
  // const { dimensions } = useContext(AppearanceContext);

  return (
    <div className={classnames(onReturnScreenDimensions(size), "hidden")}>
      <ReactPlayer
        controls
        url={url}
        width="0%"
        height="0%"
        playing={isPlaying}
        className="react-player"
      />
    </div>
  );
};

export default PlayerScreen;
