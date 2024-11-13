import { Fragment, useContext, useEffect, useState } from 'react';
import { onFetcher } from '../../../api/fetcher';
import { useQuery } from '@tanstack/react-query';
import Wheel from '../../../components/wheel/wheel';
import { PlayerContext } from '../../../contexts/player';
import { useNavigate, useParams } from 'react-router-dom';
import PlaylistDisplay from '../music-menu/playlist-display';
import MenuScreen from '../../../components/screen/with-menu/menu-screen';

const componentMounts = true;

const PlaylistSelected = () => {
  const { dispatchPlay, currentSong, currentCollection } =
    useContext(PlayerContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: [`playlist-${id}`],
    queryFn: async () => onFetcher(`/music/playlists/${id}`),
  });

  const [menuItemSelected, setMenuItemSelected] = useState(null);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);

  const onShowPlaylistModal = (payload, currentIndex) => {
    setCurrentItemSelectedIndex(currentIndex);
    setMenuItemSelected(payload);
  };

  const handleButtonMenu = () => {
    localStorage.removeItem("lastPlaylistSelectedIndex");
    navigate(-1);
  };

  const handleCenterButton = () => {
    const currentSongSelected = currentCollection[currentItemSelectedIndex];
    dispatchPlay({
      type: "SET_CURRENT_SONG",
      payload: currentSongSelected,
    });
    navigate("/now-playing");
    localStorage.setItem("lastPlaylistSelectedIndex", currentItemSelectedIndex);
    return;
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

      const payload = {
        title: data.data.playlistName,
        values: songs,
      };
      const last_index = Number(localStorage.getItem("lastPlaylistSelectedIndex"));
      onShowPlaylistModal(payload, last_index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);



  return (
    <Fragment>
      <MenuScreen>
        {
          menuItemSelected && (
            <PlaylistDisplay
              itemSelected={menuItemSelected}
              currentIndex={currentItemSelectedIndex}
            />
          )
        }
      </MenuScreen>
      <Wheel
        prev={{
          disabled: false,
          onClick: handlePrevButton,
        }}
        next={{
          disabled: false,
          onClick: handleNextButton,
        }}
        menu={{
          disabled: false,
          onClick: handleButtonMenu,
        }}
        centerButton={{
          disabled: false,
          onClick: handleCenterButton
        }}
        play={{
          disabled: false,
          onClick: handlePlayButton,
        }}
      />
    </Fragment>
  );
};

export default PlaylistSelected;
