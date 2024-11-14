import { useContext } from 'react';
import classnames from 'classnames';
import { PlayerContext } from '../../../contexts/player';
import { ShuffleIcon } from '../../../assets/icons/shuffle';
const generic = "w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md ";

const ShuffleManager = () => {
  const { statePlay, dispatchPlay } = useContext(PlayerContext);
  return (
    <button
      type="button"
      onClick={() => dispatchPlay({ type: "SET_SHUFFLE" })}
      className={classnames(generic, statePlay.shuffle ? "neon_button" : "")}
    >
      <ShuffleIcon color={statePlay.shuffle ? "#026cf8" : "#949494"} />
    </button>
  );
};

export default ShuffleManager;
