import classNames from "classnames";

const WheelCircumference = ({ children }) => {
  return (
    <div
      className={classNames("ipod-wheel relative bg-gray-200 w-60 h-60 rounded-full mx-auto cursor-pointer", "wheel-shadow")}
    >
      {children}
    </div>
  );
};

export default WheelCircumference;
