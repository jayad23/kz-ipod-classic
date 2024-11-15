
import { Fragment, useState, useContext, useEffect } from "react";
import menu_data from "./menu.json";
import classnames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import Wheel from "../../../components/wheel/wheel";
import { PlayerContext } from "../../../contexts/player";
import OptionsMapper from "../../../components/options.mapper";
import { getOnlyImages } from "../../../utils/get-only-images";
import MenuScreen from "../../../components/screen/with-menu/menu-screen";
import RandomFloatingImage from "../../../components/random-floating-image";
import InformationBar from "../../../components/information-bar/information-bar";

const MusicMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { albums } = useContext(PlayerContext);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const index = currentIndex < menu_data.menu_options.length - 1 ? currentIndex + 1 : currentIndex;
    history.pushState(null, "", menu_data.menu_options[index].hash_id);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const index = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    history.pushState(null, "", menu_data.menu_options[index].hash_id);
    setCurrentIndex(index);
  };

  const handleCenterButton = () => {
    const menu_item_selected = menu_data.menu_options[currentIndex];
    if (menu_item_selected && menu_item_selected.id === 0) {
      navigateWithTransition("/music/cover-flow");
      return;
    }
    navigate(`/music${menu_item_selected.route}`);
  };

  const handleButtonMenu = () => {
    navigate("/menu");
  };

  useEffect(() => {
    if (location.search) {
      const index = menu_data.menu_options.findIndex((item) => item.hash_id === location.search);
      setCurrentIndex(index);
    } else {
      setCurrentIndex(0);
    }

  }, [location.search]);

  return (
    <Fragment>
      <MenuScreen>
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
