
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
import GenericItemSelected from "../../../components/item-selected/generic-item-selected";

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

  const handleNext = () => {
    setCurrentIndex(prevIndex => prevIndex < menu_data.menu_options.length - 1 ? prevIndex + 1 : prevIndex);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : prevIndex);
  };

  const handleCenterButton = () => {
    const menu_item_selected = menu_data.menu_options[currentIndex];
    if (menu_item_selected && menu_item_selected.id === 0) {
      const left = document.getElementById("left");
      left.classList.add("open-left-animation");
      const right = document.getElementById("right");
      right.classList.add("open-right-animation");
      setTimeout(() => {
        navigate(`/music${menu_item_selected.route}`);
      }, 425);
      return;
    }
  };

  const handleButtonMenu = () => {
    navigate("/menu");
  };

  return (
    <Fragment>
      <MenuScreen>
        {menuItemSelected && <GenericItemSelected itemSelected={menuItemSelected} currentIndex={currentItemSelectedIndex} />}
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
