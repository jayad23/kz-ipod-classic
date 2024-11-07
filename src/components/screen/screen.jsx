import { motion, useMotionValue } from 'framer-motion';
import InformationBar from "../information-bar/information-bar";
import BlackBorder from "./black-border";

const Screen = ({ children, currentScreen }) => {
  const x = useMotionValue(0);
  return (
    <BlackBorder>
      <motion.div
        className="bg-white w-full h-[250px] flex items-center justify-center overflow-hidden relative border"
        style={{ x }}
      >
        <InformationBar currentScreen={currentScreen} />
        {children}
      </motion.div>
    </BlackBorder>
  );
};

export default Screen;
