import { Battery } from "../../assets/icons/battery";
import "./custom.css";
import classnames from "classnames";
import { BxPlay } from "./bxplay.information.icon";
import { BxStop } from "./bxstop.information";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/player";

const InformationBar = () => {
  const { statePlay } = useContext(PlayerContext);

  return (
    <div className={classnames("w-full h-2 flex items-center justify-between absolute top-0 left-0", "steel-bar")}>
      <span className="text-black text-[10px] font-bold m-0">
        Cover Flow
      </span>
      <div className="flex items-center gap-1">
        <div>
          {
            statePlay.isPlaying ? <BxStop /> : <BxPlay />
          }
        </div>
        <div>
          <Battery />
        </div>
      </div>
    </div>
  );
};

export default InformationBar;
