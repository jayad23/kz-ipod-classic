import classnames from "classnames";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppearanceContext } from "../contexts/appearance";
const IpodMask = () => {
  const { theme, dimensions } = useContext(AppearanceContext);
  return (
    <div

      style={{
        width: dimensions.width,
        height: dimensions.height,
        background: theme.config.body,
        padding: dimensions.padding,
        borderRadius: dimensions.borderRadius
      }}
      className={classnames("flex flex-col shadow-2xl")}
    >
      <Outlet />
    </div>
  );
};

export default IpodMask;
