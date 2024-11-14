import "../player.css";
import classnames from "classnames";
import { Fragment, useState } from "react";
import RepeatManager from "./repeat-manager";
import ShuffleManager from "./shuffle-manager";
import { Karaoke } from "../../../assets/icons/karaoke";
import KaraokeComponent from "../../../components/karaoke/karaoke";


const generic = "w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md ";

const OtherOptions = () => {
  const [showKaraoke, setShowKaraoke] = useState(false);

  const toggleKaraoke = () => setShowKaraoke(!showKaraoke);

  return (
    <Fragment>
      {showKaraoke && <KaraokeComponent onClose={toggleKaraoke} />}
      <div className="flex flex-end w-full">
        <div
          style={{ padding: "0.5rem 15px" }}
          className="absolute bottom-0 w-full flex justify-center gap-5 backdrop-blur-sm"
        >
          <ShuffleManager />
          <RepeatManager />
          <button
            type="button"
            onClick={toggleKaraoke}
            className={
              classnames(generic, "neon_button")
            }
          >
            <Karaoke color="rgb(96 165 250 / var(--tw-bg-opacity))" />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default OtherOptions;
