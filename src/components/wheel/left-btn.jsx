import { LeftArrow } from "../../assets/icons/left";

const Left = ({ handlePrev }) => {
  return (
    <button type="button" onClick={handlePrev} className="absolute top-1/2 left-6 -translate-x-1/2 -translate-y-1/2 text-sm w-[50%] h-[75px] flex items-center justify-center active:scale-95">
      <LeftArrow />
    </button>
  );
};

export default Left;
