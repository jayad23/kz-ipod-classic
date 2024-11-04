import { useContext } from "react";
import { PlayIcon } from "../../assets/icons/play";
import { PlayerContext } from "../../contexts/player";

const Play = () => {
  const { dispatchPlay } = useContext(PlayerContext);
  return (
    <button type="button" onClick={() => dispatchPlay({ type: "PLAY_PAUSE" })} className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 text-sm w-[50%] h-[80px] flex items-center justify-center active:scale-95">
      <PlayIcon />
    </button>
  );
};

export default Play;
