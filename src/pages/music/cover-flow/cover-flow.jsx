import { Fragment, useState } from "react";
import { albums } from "../../../assets/cover";
import Wheel from "../../../components/wheel/wheel";
import Screen from "../../../components/screen/screen";
import ImageFlow from "../../../components/image-flow";

const CoverFlow = () => {
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemSelected, setItemSelected] = useState(null);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);

  const handleNext = () => {
    if (itemSelected) {
      setCurrentItemSelectedIndex((prev) => prev < itemSelected.songs.length - 1 ? prev + 1 : prev);
      return;
    }

    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % albums.length);
  };

  const handlePrev = () => {
    if (itemSelected) {
      setCurrentItemSelectedIndex((prev) => prev > 0 ? prev - 1 : prev);
      return;
    }
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
  };

  const handleCenterButton = () => {
    if (!itemSelected) {
      const currentAlbum = albums[currentIndex];
      setItemSelected(currentAlbum);
    }
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
        currentScreen="cover flow"
        itemSelected={itemSelected}
        currentSelectedIndex={currentItemSelectedIndex}
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
