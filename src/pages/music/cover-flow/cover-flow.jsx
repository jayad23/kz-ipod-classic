import { Fragment, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wheel from "../../../components/wheel/wheel";
import Screen from "../../../components/screen/screen";
import ImageFlow from "../../../components/image-flow";
import { PlayerContext } from "../../../contexts/player";
import ItemSelected from "../../../components/item-selected/item-selected";

const CoverFlow = () => {
  const navigate = useNavigate();
  const { albums, dispatchPlay } = useContext(PlayerContext);

  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(Number(localStorage.getItem("lastCoverIndex")));
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
      const payload = {
        ...currentAlbum,
        title: currentAlbum.name,
        sub_title: currentAlbum.author,
        photo_url: currentAlbum.thumbnail,
        values: currentAlbum.songs.map((song) => ({ ...song, label: song.songName })),
      };
      setItemSelected(payload);
      return;
    }
    if (itemSelected) {
      const current_collection = itemSelected.values.map((song, index) => ({ ...song, index }));
      const selected_song = current_collection[currentItemSelectedIndex];

      dispatchPlay({
        type: "SET_CURRENT_COLLECTION",
        payload: current_collection
      });
      dispatchPlay({
        type: "SET_CURRENT_SONG",
        payload: selected_song,
      });
      localStorage.setItem("lastCoverIndex", currentIndex);
      localStorage.setItem("lastSelectedSong", currentItemSelectedIndex);
      navigate("/now-playing");
      return;
    }
  };

  const handleButtonMenu = () => {
    if (itemSelected) {
      setItemSelected(null);
      setCurrentItemSelectedIndex(0);
      return;
    }
    localStorage.removeItem("lastCoverIndex");
    navigate(-1);
  };

  useEffect(() => {
    const lastCoverIndex = localStorage.getItem("lastCoverIndex");
    const lastSelectedSong = localStorage.getItem("lastSelectedSong");
    if (lastCoverIndex && lastSelectedSong) {
      setCurrentIndex(Number(lastCoverIndex));
      setCurrentItemSelectedIndex(Number(lastSelectedSong));
      handleCenterButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Screen
        currentScreen="Cover Flow"
      >
        {itemSelected && (<ItemSelected itemSelected={itemSelected} currentIndex={currentItemSelectedIndex} />)}
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
