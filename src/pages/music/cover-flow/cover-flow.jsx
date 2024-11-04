import { Fragment, useState } from "react";
import { albums } from "../../../assets/cover";
import Wheel from "../../../components/wheel/wheel";
import Screen from "../../../components/screen/screen";
import ImageFlow from "../../../components/image-flow";

const CoverFlow = () => {
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemSelected, setItemSelected] = useState(null);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % albums.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
  };

  const handleCenterButton = () => {
    console.log("Hay click");
    const currentAlbum = albums[currentIndex];
    setItemSelected(currentAlbum);
  };

  const handleButtonMenu = () => {
    if (itemSelected) {
      setItemSelected(null);
      return;
    }

  };

  return (
    <Fragment>
      <Screen
        itemSelected={itemSelected}
        currentScreen="cover flow"
      >
        <ImageFlow
          albums={albums}
          direction={direction}
          currentIndex={currentIndex}
        />
      </Screen>
      <Wheel
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleButtonMenu={handleButtonMenu}
        handleCenterButton={handleCenterButton}
      />
    </Fragment>
  );
};

export default CoverFlow;
