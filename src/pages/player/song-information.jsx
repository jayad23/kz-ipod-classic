import "./player.css";
import classnames from "classnames";
import SmartImageDisplay from "./smart-image-displayer";


const SongInformation = ({ songName, artist, img, playlistName }) => {
  return (
    <div
      className={classnames("absolute top-[17px] w-full p-3 flex justify-center items-center")}
      style={{ perspective: "340px" }}
    >
      <SmartImageDisplay
        currentSongImage={img}
        currentSongName={songName}
      />
      <div className="w-1/2 ml-2 pt-7 flex flex-col overflow-hidden">
        <span
          className={
            classnames("text-slate-600 text-md font-bold", "span-title", songName.length > 12 ? "song_name" : "")
          }
        >
          {songName}
        </span>
        <span
          className={
            classnames("text-slate-600 text-[12px] font-semibold", "span-title")
          }
        >
          {artist}
        </span>
        <span
          className={
            classnames("text-slate-600 text-[12px] font-semibold", "span-title")
          }
        >
          {playlistName}
        </span>
        <span
          className={
            classnames("text-slate-600 text-[10px] font-bold mt-2", "span-title")
          }
        >
          1 of 23
        </span>
      </div>
    </div>
  );
};

export default SongInformation;
