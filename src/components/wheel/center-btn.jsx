import { useContext } from "react";
import { AppearanceContext } from "../../contexts/appearance";
const Center = ({ onClick, disabled }) => {
  const { theme, dimensions } = useContext(AppearanceContext);
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      style={{
        background: theme.config.body,
        top: dimensions.center_button.top,
        width: dimensions.center_button.circumference,
        height: dimensions.center_button.circumference
      }}
      className={"absolute left-1/2 -translate-x-1/2 translate-y-1/2 text-sm rounded-full flex items-center justify-center active:scale-95 outline-none"}
    >
      <span style={{ display: "none" }}>CENTER BUTTON</span>
    </button>
  );
};

export default Center;
