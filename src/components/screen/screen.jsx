import CoverFlow from "../cover-flow";
import { motion, useMotionValue } from 'framer-motion';
import InformationBar from "../information-bar/InformationBar";
import BlackBorder from "./black-border";

const Screen = ({ albums, direction, currentIndex }) => {
  const x = useMotionValue(0);
  return (
    <BlackBorder>
      <motion.div
        className="bg-white w-full h-full flex items-center justify-center overflow-hidden relative"
        style={{ x }}
      >
        <InformationBar />
        <CoverFlow
          albums={albums}
          direction={direction}
          currentIndex={currentIndex}
        />
      </motion.div>
    </BlackBorder>
  );
};

export default Screen;
