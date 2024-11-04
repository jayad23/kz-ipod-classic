import WheelCircumference from "./wheel-circumference";
import Menu from "./menu-btn";
import Left from "./left-btn";
import Play from "./play-btn";
import Right from "./right-btn";
import Center from "./center-btn";

const Wheel = ({ handlePrev, handleNext, handleCenterButton, handleButtonMenu }) => {
  return (
    <WheelCircumference>
      <Menu onClick={handleButtonMenu} />
      <Left handlePrev={handlePrev} />
      <Right handleNext={handleNext} />
      <Play />
      <Center onClick={handleCenterButton} />
    </WheelCircumference>
  );
};

export default Wheel;
