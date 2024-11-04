import App from "./App";
import IpodMask from "../layouts/ipod-mask";
import { Routes, Route, Navigate } from "react-router-dom";

import CoverFlow from "../pages/music/cover-flow/cover-flow";
//import AlbumSelected from "../pages/music/album-selected/album-selected";

const RouterApp = () => {
  return (
    <App>
      <Routes>
        <Route element={<IpodMask />}>
          <Route path="/music/cover-flow" element={<CoverFlow />} />
          {/* <Route path="/music/cover-flow/:id" element={<AlbumSelected />} /> */}
        </Route>
        <Route path="/" element={<Navigate to="/music/cover-flow" />} />
      </Routes>
    </App>
  );
};

export default RouterApp;
