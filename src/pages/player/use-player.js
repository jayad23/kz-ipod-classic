/* eslint-disable no-unused-vars */
import { useState } from "react";
import { onFetcher } from "../../api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getOnlyImages } from "../../utils/get-only-images";

export const usePlayer = () => {
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

  return {
    data,
    isLoading,
    currentIndex,
    handleButtonMenu,
    menuItemSelected,
    currentItemSelectedIndex,
  };
};
