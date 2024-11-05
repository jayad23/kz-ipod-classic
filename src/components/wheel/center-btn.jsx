import { useContext } from "react";
import { AppearanceContext } from "../../contexts/appearance";
const Center = ({ onClick, disabled }) => {
  const { theme } = useContext(AppearanceContext);
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      style={{ background: theme.config.body }}
      className={"absolute left-1/2 top-[40.5px] -translate-x-1/2 translate-y-1/2 text-sm w-[80px] h-[80px] rounded-full flex items-center justify-center active:scale-95 outline-none"}
    >
      <span style={{ display: "none" }}>CENTER BUTTON</span>
    </button>
  );
};

export default Center;
