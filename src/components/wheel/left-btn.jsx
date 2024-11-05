import { LeftArrow } from "../../assets/icons/left";

const Left = ({ onClick, disabled }) => {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className="absolute outline-none top-1/2 left-6 -translate-x-1/2 -translate-y-1/2 text-sm w-[50%] h-[75px] flex items-center justify-center active:scale-95">
      <LeftArrow />
    </button>
  );
};

export default Left;
