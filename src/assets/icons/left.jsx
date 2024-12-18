import { useContext } from "react";
import { AppearanceContext } from "../../contexts/appearance";
export function LeftArrow(props) {
  const { theme } = useContext(AppearanceContext);
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill={theme.config.text} d="m20.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647.565 1.659.106 1.659-.753V5c0-.86-1.012-1.318-1.659-.753m-11 0l-8 7a1 1 0 0 0 0 1.506l8 7C9.988 20.318 11 19.859 11 19V5c0-.86-1.012-1.318-1.659-.753"></path></svg>);
}