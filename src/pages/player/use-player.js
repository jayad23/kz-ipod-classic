/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { onFetcher } from "../../api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getOnlyImages } from "../../utils/get-only-images";
import { PlayerContext } from "../../contexts/player";
import mockData from "./data.json";

const componentMounts = true;
export const usePlayer = () => {
  const { dispatchPlay, currentSong } = useContext(PlayerContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [`playlist-${id}`],
    queryFn: async () => onFetcher(`/music/playlists/${id}`),
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuItemSelected, setMenuItemSelected] = useState(null);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);

  const handleButtonMenu = () => {
    navigate(-1);
  };

  const handlePlayButton = () => {
    dispatchPlay({ type: "PLAY_PAUSE" });
  };

  useEffect(() => {
    if (data && componentMounts) {
      console.log("component Mounts");
      dispatchPlay({
        type: "SET_CURRENT_COLLECTION",
        payload: data.data.songs,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    data,
    isLoading,
    currentSong,
    currentIndex,
    handleButtonMenu,
    menuItemSelected,
    handlePlayButton,
    currentItemSelectedIndex,
  };
};
