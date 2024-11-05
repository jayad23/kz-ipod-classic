import classNames from "classnames";
import { useContext } from "react";
import { AppearanceContext } from "../../contexts/appearance";

const Menu = ({ onClick, disabled }) => {
  const { theme } = useContext(AppearanceContext);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        classNames("absolute outline-none top-0 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-600 active:scale-95 transition-transform",
          "w-[100%] h-[80px]"
        )
      }
    >
      <div style={{ color: theme.config.text }} className="mb-4">
        MENU
      </div>
    </button>
  );
};

export default Menu;
