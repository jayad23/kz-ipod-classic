import { useContext } from 'react';
import classnames from "classnames";
import iOSLoading from "../../../assets/ios_loading.gif";
import BlackBorder from "../black-border";
import { motion, useMotionValue } from 'framer-motion';
import { AppearanceContext } from '../../../contexts/appearance';

const MenuScreen = ({ children, bg = "bg-white", loading }) => {
  const x = useMotionValue(0);

  const { dimensions } = useContext(AppearanceContext);

  return (
    <BlackBorder>
      <motion.div
        className={classnames("w-full flex items-center justify-center overflow-hidden relative border", bg)}
        style={{
          x,
          height: dimensions.size === "small" ? "250px" : "300px",
        }}
      >
        {loading ? <img src={iOSLoading} alt="loading" className="w-8 h-8" /> : children}
      </motion.div>
    </BlackBorder>
  );
};

export default MenuScreen;
