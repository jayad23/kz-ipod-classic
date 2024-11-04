import classNames from "classnames";

const Menu = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        classNames("absolute top-0 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-600 active:scale-95 transition-transform",
          "w-[100%] h-[60px]"
        )
      }
    >
      MENU
    </button>
  );
};

export default Menu;
