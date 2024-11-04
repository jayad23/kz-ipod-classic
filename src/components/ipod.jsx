import classnames from "classnames";
import { albums } from "../assets/cover";
import { useState, useContext } from "react";
import { PlayIcon } from "../assets/icons/play";
import { LeftArrow } from "../assets/icons/left";
import { RightArrow } from "../assets/icons/right";
import { PlayerContext } from "../contexts/player";
import Screen from "./screen/screen";

function IPodClassic() {
  const { dispatchPlay } = useContext(PlayerContext);
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % albums.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
  };
  //w-[360px] h-[98vh]
  return (
    <div className="bg-gray-100 rounded-[20px] p-5 w-[300px] h-[500px] flex flex-col shadow-2xl">
      {/* Screen */}
      <Screen albums={albums} direction={direction} currentIndex={currentIndex} />

      {/* Control Wheel */}
      <div
        className={classnames("ipod-wheel relative bg-gray-200 w-48 h-48 rounded-full mx-auto cursor-pointer", "wheel-shadow")}
      >
        <button
          className={
            classnames("absolute top-0 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-600 active:scale-95 transition-transform",
              "w-[100%] h-[60px]"
            )
          }
        >
          MENU
        </button>
        <button
          onClick={handleNext}
          className={
            classnames("absolute top-1/2 right-6 translate-x-1/2 -translate-y-1/2 text-sm",
              "w-[30%] h-[50px] flex items-center justify-center active:scale-95"
            )
          }
        >
          <RightArrow />
        </button>
        <button onClick={handlePrev} className="absolute top-1/2 left-6 -translate-x-1/2 -translate-y-1/2 text-sm w-[40%] h-[50px] flex items-center justify-center active:scale-95">
          <LeftArrow />
        </button>
        <button onClick={() => dispatchPlay({ type: "PLAY_PAUSE" })} className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 text-sm w-[50%] h-[80px] flex items-center justify-center active:scale-95">
          <PlayIcon />
        </button>
        <button className="absolute left-1/2 top-9 -translate-x-1/2 translate-y-1/2 text-sm w-[60px] h-[60px] rounded-full flex items-center justify-center active:scale-95">
          <span style={{ display: "none" }}>CENTER BUTTON</span>
        </button>
      </div>
    </div>
  );
}

export default IPodClassic;
