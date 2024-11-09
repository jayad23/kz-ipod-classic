import { AnimatePresence, motion } from "framer-motion";
import classnames from "classnames";
import { useEffect, useRef } from "react";
import { textEllipsis } from "../../../utils/text-ellipsis";

const PlaylistDisplay = ({ itemSelected, currentIndex }) => {
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
    <AnimatePresence>
      <motion.div
        className="absolute w-full flex flex-col top-0 bg-white z-30"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {itemSelected?.values.map((item, index) => (
          <div
            ref={(el) => (itemRef.current[index] = el)}
            className={classnames("flex", {
              ["item-selected"]: index === currentIndex,
            })}
            key={item.id}
          >
            <div className="w-[4rem] h-[3rem]">
              <img
                className="w-full h-full object-cover"
                src={item?.thumbnail || item?.img}
                alt={item?.label}
              />
            </div>
            <div
              style={{ padding: "0px 10px", width: "100%" }}
              className="flex flex-col"
            >
              <div
                style={{ color: index === currentIndex ? "white" : "" }}
                className={classnames("text-[0.85rem] text-slate-800 font-bold")}
              >
                {textEllipsis(item?.album_title || item?.label, 30)}
              </div>
              <div
                style={{ color: index === currentIndex ? "white" : "" }}
                className={classnames("text-[0.8rem] text-slate-800")}
              >
                {item?.author || item?.artist}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default PlaylistDisplay;
