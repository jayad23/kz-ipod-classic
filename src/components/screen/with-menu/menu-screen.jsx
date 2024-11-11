import { motion, useMotionValue } from 'framer-motion';
import BlackBorder from "../black-border";
import classnames from "classnames";
import { useContext } from 'react';
import { AppearanceContext } from '../../../contexts/appearance';

const MenuScreen = ({ children, bg = "bg-white" }) => {
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
        {children}
      </motion.div>
    </BlackBorder>
  );
};

export default MenuScreen;
