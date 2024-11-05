import { useContext } from "react";
import classNames from "classnames";
import { AppearanceContext } from "../../contexts/appearance";

const WheelCircumference = ({ children }) => {
  const { theme } = useContext(AppearanceContext);
  return (
    <div
      style={{ background: theme.config.wheel }}
      className={classNames("ipod-wheel relative w-60 h-60 rounded-full mx-auto cursor-pointer overflow-hidden", "wheel-shadow")}
    >
      {children}
    </div>
  );
};

export default WheelCircumference;
