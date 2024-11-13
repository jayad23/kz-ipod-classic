
import { Fragment } from 'react';
import ProgressBar from "./progress-bar";
import { usePlayer } from './use-player';
import Wheel from '../../components/wheel/wheel';
import OtherOptions from "./other/other-options";
import CurrentSongPlaying from "./song-information";
import PlaylistDisplay from "../music/music-menu/playlist-display";
import MenuScreen from '../../components/screen/with-menu/menu-screen';
import InformationBar from '../../components/information-bar/information-bar';

const Player = () => {
  const {
    data,
    currentSong,
    handleButtonMenu,
    menuItemSelected,
    handlePlayButton,
    handleNextButton,
    handlePrevButton,
    handleCenterButton,
    currentItemSelectedIndex,
  } = usePlayer();

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
        <InformationBar currentScreen="" dark_line />
        {
          currentSong && !menuItemSelected && (
            <CurrentSongPlaying
              {...currentSong}
              total={data?.data?.songs?.length}
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
