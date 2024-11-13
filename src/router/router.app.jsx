import App from "./App";
import IpodMask from "../layouts/ipod-mask";
import { Routes, Route, Navigate } from "react-router-dom";

import Menu from "../pages/menu/menu";
import Settings from "../pages/settings/settings";
import CoverFlow from "../pages/music/cover-flow/cover-flow";
import MusicMenu from "../pages/music/music-menu/music-menu";
import PlaylistSelected from "../pages/music/playlists/selected";
import MusicItemSelected from "../pages/music/music-menu/menu-item-selected";
//import AlbumSelected from "../pages/music/album-selected/album-selected";

const RouterApp = () => {
  return (
    <App>
      <Routes>
        <Route element={<IpodMask />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/music" element={<MusicMenu />} />
          <Route path="/music/cover-flow" element={<CoverFlow />} />
          <Route path="/music/:route_id" element={<MusicItemSelected />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/music/playlists/playlist-selected/:id" element={<PlaylistSelected />} />
        </Route>
        <Route path="/" element={<Navigate to="/music" />} />
      </Routes>
    </App>
  );
};

export default RouterApp;
