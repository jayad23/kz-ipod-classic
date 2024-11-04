import classnames from "classnames";
import { motion } from "framer-motion";
import { ArrowRight } from "../assets/icons/arrow-right";

const OptionsMapper = ({ options, currentIndex }) => {
  return (
    <div className="h-full mt-[16.5px] bg-white shadow-2xl border overflow-auto">
      {
        options.map((menu) => (
          <motion.div
            key={menu.id}
            className={classnames(
              "w-full flex items-center justify-between",
              "border-b border-gray-100",
              currentIndex === menu.id ? "item-selected" : `bg-slate-${menu.id % 2 === 0 ? 100 : 0}`,
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + menu.id * 0.1 }}
          >
            <span
              style={{ color: currentIndex === menu.id ? "white" : "" }}
              className={
                classnames("text-black text-[11px] font-bold", "span-title")
              }
            >
              {menu.title}
            </span>
            {
              currentIndex === menu.id && (
                <ArrowRight width={20} height={20} />
              )
            }
          </motion.div>
        ))
      }
    </div>
  );
};

export default OptionsMapper;
