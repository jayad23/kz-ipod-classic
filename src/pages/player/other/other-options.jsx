import "../player.css";
import classnames from "classnames";
import { Karaoke } from "../../../assets/icons/karaoke";

const generic = "w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md";

const OtherOptions = () => {
  return (
    <div
      style={{ padding: "0.5rem 15px" }}
      className="absolute bottom-0 w-full flex justify-between backdrop-blur-sm"
    >
      <button
        className={
          classnames(generic, "invisible")
        }
      >
        {":)"}
      </button>
      <button
        className={
          classnames(generic, "invisible")
        }
      >
        {":)"}
      </button>
      <button
        className={
          classnames(generic, "invisible")
        }
      >
        {":)"}
      </button>
      <button
        className={
          classnames(generic, "neon_button")
        }
      >
        <Karaoke color="#ff6739" />
      </button>
    </div>
  );
};

export default OtherOptions;
