import { AnimatePresence, motion } from "framer-motion";
import classnames from "classnames";
import { useEffect, useRef } from "react";
import { textEllipsis } from "../../../utils/text-ellipsis";
import InformationBar from "../../../components/information-bar/information-bar";

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
        className="absolute w-full flex flex-col top-0 bg-white z-50"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <InformationBar currentScreen={itemSelected?.title} dark_line />
        {itemSelected?.values.map((item, index) => (
          <div
            style={{ marginTop: index === 0 ? "18px" : "" }}
            ref={(el) => (itemRef.current[index] = el)}
            className={classnames("flex", {
              ["item-selected"]: index === currentIndex
            })}
            key={`${item.id}-${index}`}
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
                {textEllipsis(item?.album_title || item?.label || item?.songName, 30)}
              </div>
              <div
                style={{ color: index === currentIndex ? "white" : "" }}
                className={classnames("text-[0.8rem] text-slate-800")}
              >
                {item?.artist ? item?.artist : item?.author ? `Created by ${item.author}` : ""}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default PlaylistDisplay;
