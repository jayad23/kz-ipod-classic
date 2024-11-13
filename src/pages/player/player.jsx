
import { Fragment } from 'react';
import ProgressBar from "./progress-bar";
import { usePlayer } from './use-player';
import Wheel from '../../components/wheel/wheel';
import OtherOptions from "./other/other-options";
import CurrentSongPlaying from "./song-information";
import MenuScreen from '../../components/screen/with-menu/menu-screen';
import InformationBar from '../../components/information-bar/information-bar';

const Player = () => {
  const {
    currentSong,
    handleButtonMenu,
    menuItemSelected,
    handlePlayButton,
    handleNextButton,
    handlePrevButton,
    currentCollection,
    handleCenterButton,
  } = usePlayer();

  return (
    <Fragment>
      <MenuScreen>
        <InformationBar currentScreen="" dark_line />
        {
          currentSong && !menuItemSelected && (
            <CurrentSongPlaying
              {...currentSong}
              total={currentCollection?.length}
            />
          )
        }
        <ProgressBar />
        <OtherOptions />
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

export default Player;
