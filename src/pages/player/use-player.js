import { useContext, useEffect, useState } from "react";
import { onFetcher } from "../../api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { PlayerContext } from "../../contexts/player";

const componentMounts = true;
export const usePlayer = () => {
  const { dispatchPlay, currentSong, currentCollection } =
    useContext(PlayerContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [`playlist-${id}`],
    queryFn: async () => onFetcher(`/music/playlists/${id}`),
  });

  const [menuItemSelected, setMenuItemSelected] = useState(null);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);

  const onShowPlaylistModal = () => {
    const payload = {
      title: currentSong.playlistName,
      values: currentCollection,
    };

    setCurrentItemSelectedIndex(currentSong.index);
    setMenuItemSelected(payload);
  };

  const handleButtonMenu = () => {
    if (menuItemSelected) {
      setMenuItemSelected(null);
      setCurrentItemSelectedIndex(0);
      navigate(-1);
      return;
    }
    onShowPlaylistModal();
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

  useEffect(() => {
    const flag = true;
    if (data && componentMounts && flag) {
      const songs = data.data.songs;
      dispatchPlay({
        type: "SET_CURRENT_COLLECTION",
        payload: songs,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    data,
    isLoading,
    currentSong,
    handleButtonMenu,
    menuItemSelected,
    handlePlayButton,
    handleNextButton,
    handlePrevButton,
    handleCenterButton,
    currentItemSelectedIndex,
  };
};
