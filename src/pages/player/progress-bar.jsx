import { useContext } from 'react';
import classnames from "classnames";
import { PlayerContext } from '../../contexts/player';
import { formatTime } from '../../utils/time-formatter';

const spanClasses = "text-slate-600 text-[10px] font-bold w-[40px] text-center";

const ProgressBar = () => {
  const { statePlay } = useContext(PlayerContext);

  const progress = statePlay.loadedProgress;

  return (
    <div className="absolute bottom-[45px] w-full z-30 flex justify-between items-center">
      <div className={classnames(spanClasses)}>
        {formatTime(progress)}
      </div>
      <div
        style={{ width: "calc(100% - 80px)" }}
        className="bg-gray-200 h-2">
        <div
          className={classnames("h-2", "item-selected")}
          style={{ width: `${(progress / statePlay.duration) * 100}%` }}
        ></div>
      </div>
      <span className={classnames(spanClasses)}>
        - {formatTime(statePlay.duration - progress)}
      </span>
    </div>
  );
};

export default ProgressBar;