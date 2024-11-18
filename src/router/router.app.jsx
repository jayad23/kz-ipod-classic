import App from "./App";
import IpodMask from "../layouts/ipod-mask";
import { Routes, Route, Navigate } from "react-router-dom";

import Menu from "../pages/menu/menu";
import NowPlaying from "../pages/player/player";
import Settings from "../pages/settings/settings";

import CoverFlow from "../pages/music/cover-flow/cover-flow";
import MusicMenu from "../pages/music/music-menu/music-menu";
import PlaylistSelected from "../pages/music/playlists/selected";
import MusicItemSelected from "../pages/music/music-menu/menu-item-selected";
import ArtistSelected from "../pages/music/playlists/artist-selected";


const RouterApp = () => {
  return (
    <App>
      <Routes>
        <Route element={<IpodMask />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/now-playing" element={<NowPlaying />} />

          <Route path="/music" element={<MusicMenu />} />
          <Route path="/music/cover-flow" element={<CoverFlow />} />
          <Route path="/music/:route_id" element={<MusicItemSelected />} />
          <Route path="/music/playlists/playlist-selected/:id" element={<PlaylistSelected />} />
          <Route path="/music/artists/artist-selected/:id" element={<ArtistSelected />} />
        </Route>
        <Route path="/" element={<Navigate to="/music" />} />
      </Routes>
    </App>
  );
};

export default RouterApp;
