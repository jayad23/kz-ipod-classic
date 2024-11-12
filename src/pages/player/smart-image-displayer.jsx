import classnames from "classnames";
import LP from "../../assets/giphy_LP.webp";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppearanceContext } from "../../contexts/appearance";

const images_classes_on_wide = "w-[150px] h-[150px]";
const images_classes_on_small = "w-[125px] h-[125px]";

const images_classes = {
  small: images_classes_on_small,
  wide: images_classes_on_wide,
};

const SmartImageDisplay = ({ currentSongImage, currentSongName }) => {
  const [mounted, setMounted] = useState(false);
  const { dimensions } = useContext(AppearanceContext);

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
              "flex flex-col overflow-hidden", images_classes[dimensions.size]
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
            className={classnames("flex flex-col ml-2", images_classes[dimensions.size])}
            style={{ marginTop: dimensions.size === "small" ? "0.75rem" : "1.25rem" }}
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
                WebkitBoxReflect: "below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))",
                filter: "drop-shadow(0px 0px 10px rgba(103, 103, 103, 0.439))"
              }}
            />
          </motion.div>
        )
      }
    </AnimatePresence>
  );
};

export default SmartImageDisplay;
