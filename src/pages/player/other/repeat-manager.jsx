import { useContext } from 'react';
import classnames from 'classnames';
import { PlayerContext } from '../../../contexts/player';
import { LoopThroughIcon } from '../../../assets/icons/loop-through';

const generic = "w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md ";
let rep = "";
const RepeatManager = () => {
  const { dispatchPlay, statePlay } = useContext(PlayerContext);

  const handleRepeat = () => {
    const repeat = statePlay.loop;
    if (repeat === "none") {
      rep = "all";
    } else if (repeat === "all") {
      rep = "one";
    } else {
      rep = "none";
    }
    dispatchPlay({ type: "SET_LOOP", payload: rep });
  };

  return (
    <button
      type="button"
      onClick={handleRepeat}
      className={classnames(generic, statePlay.loop !== "none" ? "neon_button" : "")}
    >
      <LoopThroughIcon color={statePlay.loop === "one" ? "#026cf8" : "#949494"} />
    </button>
  );
};

export default RepeatManager;
