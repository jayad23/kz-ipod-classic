
import classnames from "classnames";
import { useEffect, useRef } from "react";

const PlaylistDisplay = ({ itemSelected, currentIndex }) => {
  console.log(itemSelected);

  const itemRef = useRef([]);

  useEffect(() => {
    if (itemRef.current[currentIndex]) {
      itemRef.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  return (
    <div
      className="absolute w-full flex flex-col top-0 bg-white z-30"
    >
      {
        itemSelected?.values.map((item) => (
          <div
            ref={(el) => (itemRef.current[item.id - 1] = el)}
            className={classnames("flex items-center", {
              ["item-selected"]: item.id - 1 === currentIndex,
            })}
            key={item.uid}
          >
            <div className="w-[3.5rem] h-[3.5rem]">
              <img
                className="w-full h-full object-cover"
                src={item?.thumbnail}
                alt={item?.label}
              />
            </div>
            <div
              style={{ padding: "0px 10px " }}
              className="flex flex-col"
            >
              <div
                style={{ color: item.id - 1 === currentIndex ? "white" : "" }}
                className={classnames("text-[1rem] text-slate-800 font-bold")}
              >
                {item?.album_title}
              </div>
              <div
                style={{ color: item.id - 1 === currentIndex ? "white" : "" }}
                className={classnames("text-[0.8rem] text-slate-800 font-semibold")}
              >
                {item?.author || item?.artist}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default PlaylistDisplay;
