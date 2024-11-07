
import { Fragment } from "react";
import images from "./images";
import classnames from "classnames";
import { useSettings } from "./use-settings";
import Wheel from "../../components/wheel/wheel";
import ConfirmationModal from "./confirmation-modal";
import OptionsMapper from "../../components/options.mapper";
import MenuScreen from "../../components/screen/with-menu/menu-screen";
import RandomFloatingImage from "../../components/random-floating-image";
import InformationBar from "../../components/information-bar/information-bar";
import GenericItemSelected from "../../components/item-selected/generic-item-selected";

const Settings = () => {
  const {
    confirm_options,
    settings_options,
    itemSelected,
    menuCurrentIndex,
    disabledCenterButton,
    currentItemSelectedIndex,
    confirmExit,
    confirmOptionIndex,
    savingPreference,
    handleNext,
    handlePrev,
    handleCenterButton,
    handleButtonMenu,
  } = useSettings();

  return (
    <Fragment>
      <MenuScreen>
        {itemSelected && <GenericItemSelected itemSelected={itemSelected} currentIndex={currentItemSelectedIndex} />}
        {confirmExit && (
          <ConfirmationModal
            confirm_options={confirm_options}
            savingPreference={savingPreference}
            confirmOptionIndex={confirmOptionIndex}
          />
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
