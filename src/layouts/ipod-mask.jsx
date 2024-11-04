import { Outlet } from "react-router-dom";

const IpodMask = () => {
  return (
    <div className="bg-[#bbbfc2] rounded-[20px] w-[360px] h-[600px] p-5  flex flex-col shadow-2xl">
      <Outlet />
    </div>
  );
};

export default IpodMask;
