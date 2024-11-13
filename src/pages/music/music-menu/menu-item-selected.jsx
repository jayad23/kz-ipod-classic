
import { Fragment, useState, useContext, useEffect } from "react";
import PlaylistDisplay from "./playlist-display";
import Wheel from "../../../components/wheel/wheel";
import { PlayerContext } from "../../../contexts/player";
import { useNavigate, useParams } from "react-router-dom";
import MenuScreen from "../../../components/screen/with-menu/menu-screen";

const MusicMenu = () => {
  const navigate = useNavigate();
  const { route_id } = useParams();
  const { albums } = useContext(PlayerContext);
  const [menuItemSelected, setMenuItemSelected] = useState(null);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);

  const handleNext = () => {
    const loopedThroughValues = menuItemSelected.values;
    const nextIndex = currentItemSelectedIndex < loopedThroughValues.length - 1 ? currentItemSelectedIndex + 1 : currentItemSelectedIndex;
    setCurrentItemSelectedIndex(nextIndex);
    return;
  };

  const handlePrev = () => {
    const prevIndex = currentItemSelectedIndex > 0 ? currentItemSelectedIndex - 1 : currentItemSelectedIndex;
    setCurrentItemSelectedIndex(prevIndex);
    return;
  };

  const handleCenterButton = () => {
    const item_selected = menuItemSelected.values[currentItemSelectedIndex];
    if (item_selected) {
      localStorage.setItem("lastSelectedIndex", currentItemSelectedIndex);
      const title = menuItemSelected.title.toLowerCase();
      if (title === "playlists") {
        navigate(`/music/playlists/playlist-selected/${item_selected.id}`);
        return;
      }
    }
  };

  const handleButtonMenu = () => {
    localStorage.removeItem("lastSelectedIndex");
    navigate(-1);
  };

  const onManagerSelection = (id) => {
    console.log(albums);
    if (id === "playlists") {
      const payload = {
        title: id.toUpperCase(),
        sub_title: `${albums.length} ${id}`,
        photo_url: "",
        values: albums.map((album) => ({ ...album, label: album.album_title }))
      };
      setMenuItemSelected(payload);
      return;
    } else if (id === "artists") {
      const artists = [];
      const values = [];
      let index = 0;
      for (const album of albums) {
        for (const song of album.songs) {
          const artist = song?.artist;
          if (artist && !artists.includes(artist)) {
            artists.push(artist);
            values.push({ ...song, label: artist, id: index++ });
          }
          continue;
        }
      };

      const payload = {
        title: id.toUpperCase(),
        sub_title: `${values.length} ${id}`,
        photo_url: "",
        values: values
      };
      setMenuItemSelected(payload);
      return;
    } else if (id === "songs") {
      const vals = [];

      for (const album of albums) {
        vals.push(...album.songs);
      }

      const values = vals.map((song) => ({ ...song, label: song.songName }));

      const payload = {
        title: id.toUpperCase(),
        sub_title: `${values.length} ${id}`,
        photo_url: "",
        values: values
      };
      setMenuItemSelected(payload);
      return;
    }
  };

  useEffect(() => {
    if (route_id) {
      console.log('route_id', route_id);
      onManagerSelection(route_id);
      const last_index = localStorage.getItem("lastSelectedIndex");
      if (last_index) {
        setCurrentItemSelectedIndex(Number(last_index));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route_id]);

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
          disabled: true
        }}
      />
    </Fragment>
  );
};

export default MusicMenu;
