import { useContext, useState } from "react";
import { onFetcher } from "../../api/fetcher";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AppearanceContext } from "../../contexts/appearance";

const confirm_options = [
  {
    id: 1,
    text: "1. Save your preferences",
  },
  {
    id: 2,
    text: "2. Continue editing",
  },
  {
    id: 3,
    text: "3. Restore default preferences",
  },
  {
    id: 4,
    text: "4. Return to the menu",
  },
];
export const useSettings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => onFetcher("/settings"),
  });

  const settings_options =
    !isLoading && data ? data?.data : { menu_options: [] };

  const navigate = useNavigate();

  const { theme, dimensions, setTheme } = useContext(AppearanceContext);

  const [itemSelected, setItemSelected] = useState(null);
  const [menuCurrentIndex, setMenuCurrentIndex] = useState(0);
  const [disabledCenterButton, setDisabledCenterButton] = useState(false);
  const [currentItemSelectedIndex, setCurrentItemSelectedIndex] = useState(0);

  const [confirmExit, setConfirmExit] = useState(false);
  const [confirmOptionIndex, setConfirmOptionIndex] = useState(0);
  const [savingPreference, setSavingPreference] = useState(false);

  const onUpdateThemeContext = (idx, type) => {
    if (type === "theme") {
      const payload = {
        config: {
          ...theme.config,
          [itemSelected.key]: itemSelected.values[idx].value,
        },
      };
      setTheme({ type: "PREVIEW", payload });
    } else if (type === "dimensions") {
      const payload = itemSelected.values[idx].value.dimensions;
      setTheme({ type: "PREVIEW_DIMENSIONS", payload });
    }
  };

  const handleNext = () => {
    if (confirmExit) {
      const index =
        confirmOptionIndex < confirm_options.length - 1
          ? confirmOptionIndex + 1
          : confirmOptionIndex;
      setConfirmOptionIndex(index);
      return;
    }

    if (itemSelected) {
      const index =
        currentItemSelectedIndex < itemSelected.values.length - 1
          ? currentItemSelectedIndex + 1
          : currentItemSelectedIndex;
      setCurrentItemSelectedIndex(index);
      const context_key =
        itemSelected.key === "dimensions" ? "dimensions" : "theme";
      onUpdateThemeContext(index, context_key);
      return;
    }
    setMenuCurrentIndex((prevIndex) =>
      prevIndex < settings_options.menu_options.length - 1
        ? prevIndex + 1
        : prevIndex,
    );
  };

  const handlePrev = () => {
    if (confirmExit) {
      const index =
        confirmOptionIndex > 0 ? confirmOptionIndex - 1 : confirmOptionIndex;
      setConfirmOptionIndex(index);
      return;
    }
    if (itemSelected) {
      const index =
        currentItemSelectedIndex > 0
          ? currentItemSelectedIndex - 1
          : currentItemSelectedIndex;
      setCurrentItemSelectedIndex(index);
      const context_key =
        itemSelected.key === "dimensions" ? "dimensions" : "theme";
      onUpdateThemeContext(index, context_key);
      return;
    }
    setMenuCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex,
    );
  };

  const handleCenterButton = () => {
    const onExecuteSaving = () => {
      setTimeout(() => {
        setConfirmOptionIndex(0);
        setSavingPreference(false);
        setConfirmExit(false);
        navigate("/menu");
      }, 1200);
    };
    if (confirmExit) {
      const confirmation_selected = confirm_options[confirmOptionIndex];
      setSavingPreference(true);
      if (confirmation_selected.id === 1) {
        setTheme({ type: "SET_THEME" });
        onExecuteSaving();
        return;
      } else if (confirmation_selected.id === 2) {
        setSavingPreference(false);
        setConfirmExit(false);
        setConfirmOptionIndex(0);
        return;
      } else if (confirmation_selected.id === 3) {
        setTheme({ type: "RESET_THEME" });
        onExecuteSaving();
        return;
      } else if (confirmation_selected.id === 4) {
        setTheme({ type: "RESET_THEME" });
        setConfirmExit(false);
        navigate("/menu");
        return;
      }
    }
    const menu_item_selected = settings_options.menu_options[menuCurrentIndex];
    if (menu_item_selected) {
      if (menu_item_selected.key !== "dimensions") {
        const reformatted_options = menu_item_selected.values.filter(
          (value) => value.value !== theme.config[menu_item_selected.key],
        );
        const selected_option = menu_item_selected.values.find(
          (value) => value.value === theme.config[menu_item_selected.key],
        );
        const payload = {
          ...menu_item_selected,
          values: selected_option
            ? [selected_option, ...reformatted_options]
            : reformatted_options,
        };
        setItemSelected(payload);
        setDisabledCenterButton(true);
      } else if (menu_item_selected.key === "dimensions") {
        const reformatted_options = menu_item_selected.values.filter(
          (value) => value.label.toLowerCase() !== dimensions.size,
        );
        const selected_option = menu_item_selected.values.find(
          (value) => value.label.toLowerCase() === dimensions.size,
        );
        const payload = {
          ...menu_item_selected,
          values: selected_option
            ? [selected_option, ...reformatted_options]
            : reformatted_options,
        };
        setItemSelected(payload);
        setDisabledCenterButton(true);
      }
    }
  };

  const handleButtonMenu = () => {
    if (itemSelected) {
      setItemSelected(null);
      setDisabledCenterButton(false);
      setCurrentItemSelectedIndex(0);
      return;
    }
    setConfirmExit(true);
  };

  return {
    isLoading,
    settings_options,
    itemSelected,
    menuCurrentIndex,
    disabledCenterButton,
    currentItemSelectedIndex,
    confirmExit,
    confirmOptionIndex,
    savingPreference,
    handleNext,
    handlePrev,
    handleCenterButton,
    handleButtonMenu,
    confirm_options,
  };
};
