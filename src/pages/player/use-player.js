import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../contexts/player";
export const usePlayer = () => {
  const { dispatchPlay, currentSong, currentCollection } =
    useContext(PlayerContext);

  const navigate = useNavigate();

  const [menuItemSelected, setMenuItemSelected] = useState(null);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);

  const handleButtonMenu = () => {
    navigate(-1);
  };

  const handleCenterButton = () => {
    if (menuItemSelected) {
      const currentSongSelected = currentCollection[currentItemSelectedIndex];
      dispatchPlay({
        type: "SET_CURRENT_SONG",
        payload: currentSongSelected,
      });
      setCurrentItemSelectedIndex(0);
      setMenuItemSelected(null);
      return;
    }
  };

  const handlePlayButton = () => {
    if (menuItemSelected) {
      handleCenterButton();
      return;
    }
    dispatchPlay({ type: "PLAY_PAUSE" });
  };

  const handleNextButton = () => {
    if (menuItemSelected) {
      const possNextIndex = currentItemSelectedIndex + 1;
      const nextIndex =
        possNextIndex === menuItemSelected.values.length
          ? currentItemSelectedIndex
          : possNextIndex;
      setCurrentItemSelectedIndex(nextIndex);
      return;
    }

    if (currentCollection && currentCollection.length > 1) {
      const prevIndex = currentSong.index + 1;
      const nextIndex = prevIndex === currentCollection.length ? 0 : prevIndex;
      if (nextIndex === 0) {
        dispatchPlay({ type: "PLAY_PAUSE" });
        return;
      }
      dispatchPlay({
        type: "SET_CURRENT_SONG",
        payload: currentCollection[nextIndex],
      });
    }
  };

  const handlePrevButton = () => {
    if (menuItemSelected) {
      const nextIndex =
        currentItemSelectedIndex === 0
          ? currentItemSelectedIndex
          : currentItemSelectedIndex - 1;
      setCurrentItemSelectedIndex(nextIndex);
      return;
    }

    if (currentCollection && currentCollection.length > 1) {
      const prevIndex = currentSong.index;
      const nextIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
      dispatchPlay({
        type: "SET_CURRENT_SONG",
        payload: currentCollection[nextIndex],
      });
    }
  };

  return {
    currentSong,
    handleButtonMenu,
    menuItemSelected,
    handlePlayButton,
    handleNextButton,
    handlePrevButton,
    currentCollection,
    handleCenterButton,
    currentItemSelectedIndex,
  };
};
