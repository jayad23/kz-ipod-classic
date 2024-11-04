import classNames from "classnames";

const WheelCircumference = ({ children }) => {
  return (
    <div
      style={{ background: "floralwhite" }}
      className={classNames("ipod-wheel relative w-60 h-60 rounded-full mx-auto cursor-pointer overflow-hidden", "wheel-shadow")}
    >
      {children}
    </div>
  );
};

export default WheelCircumference;
