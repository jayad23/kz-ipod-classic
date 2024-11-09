import classnames from "classnames";
import LP from "../../assets/giphy_LP.webp";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SmartImageDisplay = ({ currentSongImage, currentSongName }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 500);

  }, []);

  return (
    <AnimatePresence>
      {
        !mounted ? (
          <motion.div
            className={classnames(
              "w-[125px] h-[125px] flex flex-col overflow-hidden"
            )}
            animate={{ rotateY: [30, 0, 90] }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              times: [0, 0.5, 1],
              repeatDelay: 1,
            }}
          >
            <img src={LP} />
          </motion.div>
        ) : (
          <motion.div
            className="w-[125px] h-[120px] flex flex-col mt-3 ml-2"
            animate={{ rotateY: [30, 0, 30] }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              times: [0, 0.5, 1],
              repeatDelay: 1,
            }}
          >
            <img
              alt={currentSongName}
              src={currentSongImage}
              className="w-full h-full object-cover"
              style={{
                WebkitBoxReflect: "below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))"
              }}
            />
          </motion.div>
        )
      }
    </AnimatePresence>
  );
};

export default SmartImageDisplay;
