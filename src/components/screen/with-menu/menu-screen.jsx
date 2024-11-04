import { motion, useMotionValue } from 'framer-motion';
import BlackBorder from "../black-border";

const MenuScreen = ({ children }) => {
  const x = useMotionValue(0);
  return (
    <BlackBorder>
      <motion.div
        className="bg-white w-full h-[250px] flex items-center justify-center overflow-hidden relative border"
        style={{ x }}
      >
        {children}
      </motion.div>
    </BlackBorder>
  );
};

export default MenuScreen;
