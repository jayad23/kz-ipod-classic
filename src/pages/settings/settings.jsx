
import { Fragment, useContext, useState } from "react";
import classnames from "classnames";
import images from "./images";
import settings_options from "./settings.json";
import { useNavigate } from "react-router-dom";
import Wheel from "../../components/wheel/wheel";
import OptionsMapper from "../../components/options.mapper";
import MenuScreen from "../../components/screen/with-menu/menu-screen";
import RandomFloatingImage from "../../components/random-floating-image";
import InformationBar from "../../components/information-bar/information-bar";
import GenericItemSelected from "../../components/item-selected/generic-item-selected";
import { AppearanceContext } from "../../contexts/appearance";


const Settings = () => {
  const navigate = useNavigate();

  const { theme, dimensions, setTheme } = useContext(AppearanceContext);

  const [itemSelected, setItemSelected] = useState(null);
  const [menuCurrentIndex, setMenuCurrentIndex] = useState(0);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);
  const [disabledCenterButton, setDisabledCenterButton] = useState(false);

  const onUpdateThemeContext = (idx, type) => {
    if (type === "theme") {
      const payload = {
        config: {
          ...theme.config,
          [itemSelected.key]: itemSelected.values[idx].value,
        }
      };
      setTheme({ type: "PREVIEW", payload });
    } else if (type === "dimensions") {
      const payload = itemSelected.values[idx].value.dimensions;
      setTheme({ type: "PREVIEW_DIMENSIONS", payload });
    }
  };

  const handleNext = () => {
    if (itemSelected) {
      const index = currentItemSelectedIndex < itemSelected.values.length - 1 ? currentItemSelectedIndex + 1 : currentItemSelectedIndex;
      setCurrentItemSelectedIndex(index);
      const context_key = itemSelected.key === "dimensions" ? "dimensions" : "theme";
      onUpdateThemeContext(index, context_key);
      return;
    }
    setMenuCurrentIndex(prevIndex => prevIndex < settings_options.menu_options.length - 1 ? prevIndex + 1 : prevIndex);
  };

  const handlePrev = () => {
    if (itemSelected) {
      const index = currentItemSelectedIndex > 0 ? currentItemSelectedIndex - 1 : currentItemSelectedIndex;
      setCurrentItemSelectedIndex(index);
      const context_key = itemSelected.key === "dimensions" ? "dimensions" : "theme";
      onUpdateThemeContext(index, context_key);
      return;
    }
    setMenuCurrentIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : prevIndex);
  };

  const handleCenterButton = () => {
    const menu_item_selected = settings_options.menu_options[menuCurrentIndex];
    if (menu_item_selected) {
      if (menu_item_selected.key !== "dimensions") {
        const reformatted_options = menu_item_selected.values.filter((value) => value.value !== theme.config[menu_item_selected.key]);
        const selected_option = menu_item_selected.values.find((value) => value.value === theme.config[menu_item_selected.key]);
        const payload = {
          ...menu_item_selected,
          values: selected_option ? [selected_option, ...reformatted_options] : reformatted_options,
        };
        setItemSelected(payload);
        setDisabledCenterButton(true);
      } else if (menu_item_selected.key === "dimensions") {
        const reformatted_options = menu_item_selected.values.filter((value) => value.label.toLowerCase() !== dimensions.size);
        const selected_option = menu_item_selected.values.find((value) => value.label.toLowerCase() === dimensions.size);
        const payload = {
          ...menu_item_selected,
          values: selected_option ? [selected_option, ...reformatted_options] : reformatted_options,
        };
        setItemSelected(payload);
        setDisabledCenterButton(true);
      }
    }
  };

  const handleButtonMenu = () => {
    if (itemSelected) {
      setItemSelected(null);
      setDisabledCenterButton(false);
      setCurrentItemSelectedIndex(0);
      return;
    }
    navigate("/menu");
  };

  return (
    <Fragment>
      <MenuScreen>
        {
          itemSelected && <GenericItemSelected itemSelected={itemSelected} currentIndex={currentItemSelectedIndex} />
        }
        <div id="left" className={classnames("w-[45%] h-full flex flex-col absolute z-20 left-0")}>
          <InformationBar currentScreen="Settings" dark_line />
          <OptionsMapper options={settings_options.menu_options} currentIndex={menuCurrentIndex} />
        </div>
        <div id="right" className={classnames("bg-slate-900 w-[70%] h-full absolute z-10 right-0")}>
          <RandomFloatingImage images={images} />
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
          disabled: disabledCenterButton,
          onClick: handleCenterButton,
        }}
        play={{
          disabled: true
        }}
      />
    </Fragment>
  );
};

export default Settings;
