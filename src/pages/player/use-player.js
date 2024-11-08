/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { onFetcher } from "../../api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getOnlyImages } from "../../utils/get-only-images";
import { PlayerContext } from "../../contexts/player";

export const usePlayer = () => {
  const { dispatchPlay } = useContext(PlayerContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["playlist.selected"],
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

  return {
    data,
    isLoading,
    currentIndex,
    handleButtonMenu,
    menuItemSelected,
    handlePlayButton,
    currentItemSelectedIndex,
  };
};
