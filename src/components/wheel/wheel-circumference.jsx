import { useContext } from "react";
import classNames from "classnames";
import { AppearanceContext } from "../../contexts/appearance";

const WheelCircumference = ({ children }) => {
  const { theme, dimensions } = useContext(AppearanceContext);
  return (
    <div
      style={{
        background: theme.config.wheel,
        width: dimensions.circumference,
        height: dimensions.circumference,
        marginTop: dimensions.marginTop
      }}
      className={classNames("ipod-wheel relative rounded-full mx-auto cursor-pointer overflow-hidden", "wheel-shadow")}
    >
      {children}
    </div>
  );
};

export default WheelCircumference;
