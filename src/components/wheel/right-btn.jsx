import classNames from "classnames";
import { RightArrow } from "../../assets/icons/right";

const Right = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        classNames("absolute top-1/2 right-6 translate-x-1/2 -translate-y-1/2 text-sm outline-none",
          "w-[50%] h-[75px] flex items-center justify-center active:scale-95"
        )
      }
    >
      <RightArrow />
    </button>
  );
};

export default Right;
