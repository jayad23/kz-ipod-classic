import { motion, useMotionValue } from 'framer-motion';
import InformationBar from "../information-bar/information-bar";
import BlackBorder from "./black-border";
import { useContext } from 'react';
import { AppearanceContext } from '../../contexts/appearance';

const Screen = ({ children, currentScreen }) => {
  const x = useMotionValue(0);
  const { dimensions } = useContext(AppearanceContext);
  return (
    <BlackBorder>
      <motion.div
        className="bg-white w-full flex items-center justify-center overflow-hidden relative border"
        style={{
          x,
          height: dimensions.size === "small" ? "250px" : "300px",
        }}
      >
        <InformationBar currentScreen={currentScreen} />
        {children}
      </motion.div>
    </BlackBorder>
  );
};

export default Screen;
