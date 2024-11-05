import App from "./App";
import IpodMask from "../layouts/ipod-mask";
import { Routes, Route, Navigate } from "react-router-dom";

import Menu from "../pages/menu/menu";
import CoverFlow from "../pages/music/cover-flow/cover-flow";
import MusicMenu from "../pages/music/music-menu/music-menu";
import Settings from "../pages/settings/settings";
//import AlbumSelected from "../pages/music/album-selected/album-selected";

const RouterApp = () => {
  return (
    <App>
      <Routes>
        <Route element={<IpodMask />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/music" element={<MusicMenu />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/music/cover-flow" element={<CoverFlow />} />
          {/* <Route path="/music/cover-flow/:id" element={<AlbumSelected />} /> */}
        </Route>
        <Route path="/" element={<Navigate to="/music" />} />
      </Routes>
    </App>
  );
};

export default RouterApp;
