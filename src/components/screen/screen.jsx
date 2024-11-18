import { useContext } from 'react';
import BlackBorder from "./black-border";
import { motion, useMotionValue } from 'framer-motion';
import iOSLoading from "../../assets/ios_loading.gif";
import { AppearanceContext } from '../../contexts/appearance';
import InformationBar from "../information-bar/information-bar";

const Screen = ({ children, currentScreen, loading }) => {
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
        {loading ? <img src={iOSLoading} alt="loading" className="w-8 h-8" /> : children}
      </motion.div>
    </BlackBorder>
  );
};

export default Screen;
