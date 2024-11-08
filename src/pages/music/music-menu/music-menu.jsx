
import { Fragment, useState, useContext } from "react";
import menu_data from "./menu.json";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import Wheel from "../../../components/wheel/wheel";
import OptionsMapper from "../../../components/options.mapper";
import MenuScreen from "../../../components/screen/with-menu/menu-screen";
import RandomFloatingImage from "../../../components/random-floating-image";
import InformationBar from "../../../components/information-bar/information-bar";
import { PlayerContext } from "../../../contexts/player";
import ItemSelected from "../../../components/item-selected/item-selected";

const getOnlyImages = (albums) => {
  const images = albums.map((album) => album.cover);
  return images;
};

const MusicMenu = () => {
  const navigate = useNavigate();
  const { albums } = useContext(PlayerContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuItemSelected, setMenuItemSelected] = useState(null);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);

  const navigateWithTransition = (url) => {
    const left = document.getElementById("left");
    left.classList.add("open-left-animation");
    const right = document.getElementById("right");
    right.classList.add("open-right-animation");
    setTimeout(() => {
      navigate(url);
    }, 425);
  };

  const handleNext = () => {
    if (menuItemSelected) {
      const loopedThroughValues = menuItemSelected.values;
      const nextIndex = currentItemSelectedIndex < loopedThroughValues.length - 1 ? currentItemSelectedIndex + 1 : currentItemSelectedIndex;
      setCurrentItemSelectedIndex(nextIndex);
      return;
    }
    setCurrentIndex(prevIndex => prevIndex < menu_data.menu_options.length - 1 ? prevIndex + 1 : prevIndex);
  };

  const handlePrev = () => {
    if (menuItemSelected) {
      const prevIndex = currentItemSelectedIndex > 0 ? currentItemSelectedIndex - 1 : currentItemSelectedIndex;
      setCurrentItemSelectedIndex(prevIndex);
      return;
    }
    setCurrentIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : prevIndex);
  };

  const handleCenterButton = () => {
    const menu_item_selected = menu_data.menu_options[currentIndex];

    if (menuItemSelected) {
      // MAKING A SELECTION UPON THE ITEM SELECTED
      const itemSelected = menuItemSelected.values[currentItemSelectedIndex];
      if (menuItemSelected.title === "Playlists") {
        navigateWithTransition(`/music/player/${itemSelected.uid}`);
        return;
      }
      return;
    }

    if (menu_item_selected && menu_item_selected.id === 0) {
      navigateWithTransition("/music/cover-flow");
      return;
    } else if (menu_item_selected && menu_item_selected.id === 1) {
      const payload = {
        title: menu_item_selected?.title,
        sub_title: `${albums.length} ${menu_item_selected?.title}`,
        photo_url: "",
        values: albums.map((album) => ({ ...album, label: album.album_title }))
      };
      setMenuItemSelected(payload);
      return;
    } else if (menu_item_selected && menu_item_selected.id === 2) {
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
        title: menu_item_selected?.title,
        sub_title: `${values.length} ${menu_item_selected?.title}`,
        photo_url: "",
        values: values
      };
      setMenuItemSelected(payload);
      return;
    } else if (menu_item_selected && menu_item_selected.id === 3) {
      const vals = [];

      for (const album of albums) {
        vals.push(...album.songs);
      }

      const values = vals.map((song) => ({ ...song, label: song.songName }));

      const payload = {
        title: menu_item_selected?.title,
        sub_title: `${values.length} ${menu_item_selected?.title}`,
        photo_url: "",
        values: values
      };
      setMenuItemSelected(payload);
      return;
    }
  };

  const handleButtonMenu = () => {
    if (menuItemSelected) {
      setMenuItemSelected(null);
      setCurrentItemSelectedIndex(0);
      return;
    }
    navigate("/menu");
  };

  return (
    <Fragment>
      <MenuScreen>
        {menuItemSelected && <ItemSelected dark_bg itemSelected={menuItemSelected} currentIndex={currentItemSelectedIndex} />}
        <div id="left" className={classnames("w-[45%] h-full flex flex-col absolute z-20 left-0")}>
          <InformationBar currentScreen="Music" dark_line />
          <OptionsMapper options={menu_data.menu_options} currentIndex={currentIndex} />
        </div>
        <div id="right" className={classnames("bg-slate-900 w-[70%] h-full absolute z-10 right-0")}>
          <RandomFloatingImage images={getOnlyImages(albums)} />
        </div>
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
