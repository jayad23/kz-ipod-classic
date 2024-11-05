import WheelCircumference from "./wheel-circumference";
import Menu from "./menu-btn";
import Left from "./left-btn";
import Play from "./play-btn";
import Right from "./right-btn";
import Center from "./center-btn";

const Wheel = ({ prev, next, menu, centerButton, play }) => {
  return (
    <WheelCircumference>
      <Menu {...menu} />
      <Left {...prev} />
      <Right {...next} />
      <Play {...play} />
      <Center {...centerButton} />
    </WheelCircumference>
  );
};

export default Wheel;
