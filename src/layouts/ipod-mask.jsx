import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppearanceContext } from "../contexts/appearance";

const IpodMask = () => {
  const { theme, dimensions } = useContext(AppearanceContext);
  return (
    <div
      style={{ width: dimensions.width, height: dimensions.height, background: theme.config.body }}
      className={"rounded-[20px] p-5 flex flex-col shadow-2xl"}
    >
      <Outlet />
    </div>
  );
};

export default IpodMask;
