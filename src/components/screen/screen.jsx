import { motion, useMotionValue } from 'framer-motion';
import InformationBar from "../information-bar/InformationBar";
import BlackBorder from "./black-border";
import ItemSelected from '../item-selected/item-selected';

const Screen = ({ children, currentScreen, itemSelected, currentSelectedIndex }) => {
  const x = useMotionValue(0);
  return (
    <BlackBorder>
      <motion.div
        className="bg-white w-full h-[250px] flex items-center justify-center overflow-hidden relative border"
        style={{ x }}
      >
        <InformationBar currentScreen={currentScreen} />
        {children}
        {
          itemSelected && (
            <ItemSelected itemSelected={itemSelected} currentIndex={currentSelectedIndex} />
          )
        }
      </motion.div>
    </BlackBorder>
  );
};

export default Screen;
