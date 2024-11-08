/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import classnames from "classnames";
import MenuScreen from '../../components/screen/with-menu/menu-screen';
import { getSongsImages } from '../../utils/get-only-images';
import RandomFloatingImage from '../../components/random-floating-image';
import ItemSelected from '../../components/item-selected/item-selected';
import InformationBar from '../../components/information-bar/information-bar';
import OptionsMapper from '../../components/options.mapper';
import Wheel from '../../components/wheel/wheel';
import { usePlayer } from './use-player';

const Player = () => {
  const {
    data,
    isLoading,
    currentIndex,
    handleButtonMenu,
    menuItemSelected,
    handlePlayButton,
    currentItemSelectedIndex,
  } = usePlayer();

  return (
    <Fragment>
      <MenuScreen>
        {menuItemSelected && <ItemSelected dark_bg itemSelected={menuItemSelected} currentIndex={currentItemSelectedIndex} />}
        <InformationBar currentScreen={data?.data?.name || "Loading information..."} dark_line />
        <div
          className={classnames("absolute top-[17px] w-full h-full")}
        >
          information about the song and playlist
        </div>
      </MenuScreen>
      <Wheel
        prev={{
          disabled: false,
          onClick: () => { },
        }}
        next={{
          disabled: false,
          onClick: () => { }
        }}
        menu={{
          disabled: false,
          onClick: handleButtonMenu,
        }}
        centerButton={{
          disabled: false,
          onClick: () => { }
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
