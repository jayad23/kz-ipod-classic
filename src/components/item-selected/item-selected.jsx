

import "./item-selected.css";
import classnames from "classnames";
import defaultLoadingPhoto from "./settings.png";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ItemSelected = ({ itemSelected, currentIndex, dark_bg = false }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (itemSelected) {
      setTimeout(() => {
        setSelected(itemSelected);
      }, 500);
    }

  }, [itemSelected]);

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
      <div
        style={{ zIndex: 10000, backgroundColor: selected && dark_bg ? "rgba(0, 0, 0, 0.4)" : "" }}
        className={classnames(
          "absolute top-0 left-0 w-full h-full flex justify-center items-end",
        )}
      >
        {
          !selected ? (
            <motion.div
              className={classnames("w-[70%] h-[90%] flex flex-col overflow-hidden")}
              animate={{ rotateY: [0, 90] }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
                repeatDelay: 1,
              }}
            >
              <img alt={itemSelected?.title} src={itemSelected?.photo_url || defaultLoadingPhoto} />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotateY: [90, 0] }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
                repeatDelay: 1,
              }}
              className="w-[70%] h-[90%] flex flex-col overflow-hidden"
            >
              <div className={classnames("w-full h-[51px] bg-[steelblue] flex flex-col", "blue-gradient")}>
                <span
                  style={{ height: "22px" }}
                  className={
                    classnames("text-white text-md font-bold", "span-title")
                  }
                >
                  {itemSelected?.title}
                </span>
                <span
                  style={{ padding: "0 0 0 10px" }}
                  className={
                    classnames("text-white text-[9px]")
                  }
                >
                  {itemSelected?.sub_title}
                </span>
              </div>
              <div className="h-full bg-white shadow-2xl border overflow-auto">
                {
                  itemSelected.values.map((song, index) => (
                    <motion.div
                      key={song?.id || index}
                      ref={(el) => (itemRef.current[index] = el)}
                      className={classnames(
                        "w-full flex items-center ",
                        "border-b border-gray-100",
                        currentIndex === index ? "item-selected" : `bg-slate-${index % 2 === 0 ? 100 : 0}`,
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <span
                        style={{ color: currentIndex === index ? "white" : "" }}
                        className={
                          classnames("text-black text-[11px] font-bold", "span-title")
                        }
                      >
                        {song.label}
                      </span>
                    </motion.div>
                  ))
                }
              </div>
            </motion.div>
          )
        }
      </div>
    </AnimatePresence>
  );
};

export default ItemSelected;;
