
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
import { Loading } from "../../assets/icons/loading";

const confirm_options = ["1. Save your preferences",
  "2. Restore default preferences",
  "3. Return to the menu"
];


const Settings = () => {
  const navigate = useNavigate();

  const { theme, dimensions, setTheme } = useContext(AppearanceContext);

  const [itemSelected, setItemSelected] = useState(null);
  const [menuCurrentIndex, setMenuCurrentIndex] = useState(0);
  const [disabledCenterButton, setDisabledCenterButton] = useState(false);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);

  const [confirmExit, setConfirmExit] = useState(false);
  const [confirmOptionIndex, setConfirmOptionIndex] = useState(0);
  const [savingPreference, setSavingPreference] = useState(false);

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
    if (confirmExit) {
      const index = confirmOptionIndex < confirm_options.length - 1 ? confirmOptionIndex + 1 : confirmOptionIndex;
      setConfirmOptionIndex(index);
      return;
    }

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
    if (confirmExit) {
      const index = confirmOptionIndex > 0 ? confirmOptionIndex - 1 : confirmOptionIndex;
      setConfirmOptionIndex(index);
      return;
    }
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
    if (confirmExit) {
      const confirmation_selected = confirm_options[confirmOptionIndex];
      setSavingPreference(true);
      if (confirmation_selected === "1. Save your preferences") {
        setTheme({ type: "SET_THEME" });
      } else if (confirmation_selected === "2. Restore default preferences") {
        setTheme({ type: "RESET_THEME" });
      } else if (confirmation_selected === "3. Return to the menu") {
        setConfirmExit(false);
        navigate("/menu");
      }
      setTimeout(() => {
        setSavingPreference(false);
        setConfirmExit(false);
        navigate("/menu");
      }, 2000);
      return;
    }
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
    setConfirmExit(true);
  };

  return (
    <Fragment>
      <MenuScreen>
        {itemSelected && <GenericItemSelected itemSelected={itemSelected} currentIndex={currentItemSelectedIndex} />}
        {confirmExit && (
          <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full flex justify-center items-center z-50">
            <div className="flex flex-col items-left w-[85%] h-1/2 bg-white p-3 rounded-md">

              <h3 className="text-xs text-center font-semibold text-slate-600">
                🔔 CONFIRM YOUR ACTIONS FIRST
              </h3>
              <ul className="mt-2">
                {
                  confirm_options.map((text, index) => (
                    <li
                      key={index}
                      style={{
                        padding: "3px 10px",
                        color: index === confirmOptionIndex ? "white" : "#5f5959",
                        fontWeight: index === confirmOptionIndex ? "bold" : "normal",
                      }}
                      className={classnames("text-xs text-gray-600 active:scale-95 flex items-center justify-between", { ["item-selected"]: index === confirmOptionIndex })}
                    >
                      <span>
                        {text}
                      </span>
                      {
                        index === confirmOptionIndex && savingPreference && (
                          <span>
                            <Loading />
                          </span>
                        )
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        )}
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
