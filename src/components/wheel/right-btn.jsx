import classNames from "classnames";
import { RightArrow } from "../../assets/icons/right";

const Right = ({ handleNext }) => {
  return (
    <button
      type="button"
      onClick={handleNext}
      className={
        classNames("absolute top-1/2 right-6 translate-x-1/2 -translate-y-1/2 text-sm",
          "w-[50%] h-[75px] flex items-center justify-center active:scale-95"
        )
      }
    >
      <RightArrow />
    </button>
  );
};

export default Right;
