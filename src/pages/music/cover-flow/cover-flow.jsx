import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { albums } from "../../../assets/cover";
import Wheel from "../../../components/wheel/wheel";
import Screen from "../../../components/screen/screen";
import ImageFlow from "../../../components/image-flow";

import { useQuery } from "@tanstack/react-query";
import { onFetcher } from "../../../api/fetcher";

const CoverFlow = () => {
  const navigate = useNavigate();
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemSelected, setItemSelected] = useState(null);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);

  const { data } = useQuery({ queryKey: ['playlist'], queryFn: async () => onFetcher("/music/playlists") });

  const albums = data ? data.data : [];

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
      setCurrentItemSelectedIndex(0);
      return;
    }
    navigate("/music");
  };

  return (
    <Fragment>
      <Screen
        currentScreen="Cover Flow"
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
        prev={{
          disabled: false,
          onClick: handlePrev,
        }}
        next={{
          disabled: false,
          onClick: handleNext,
        }}
        menu={{
          disabled: false,
          onClick: handleButtonMenu,
        }}
        centerButton={{
          disabled: false,
          onClick: handleCenterButton,
        }}
        play={{
          disabled: false
        }}
      />
    </Fragment>
  );
};

export default CoverFlow;
