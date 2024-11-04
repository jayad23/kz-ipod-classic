const Center = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className="absolute left-1/2 top-[40.5px] -translate-x-1/2 translate-y-1/2 text-sm w-[80px] h-[80px] rounded-full flex items-center justify-center active:scale-95">
      <span style={{ display: "none" }}>CENTER BUTTON</span>
    </button>
  );
};

export default Center;
