import "./player.css";
import classnames from "classnames";
import SmartImageDisplay from "./smart-image-displayer";


const SongInformation = ({ songName }) => {
  return (
    <div
      className={classnames("absolute top-[17px] w-full p-3 flex justify-center items-center")}
      style={{ perspective: "340px" }}
    >
      <SmartImageDisplay
        currentSongName={"Show me how to live"}
        currentSongImage={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYld7Mgfdya4T8IX6z0fuW226WqCb33EsI6w&s"}
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
          AudioSlave
        </span>
        <span
          className={
            classnames("text-slate-600 text-[12px] font-semibold", "span-title")
          }
        >
          Rock on 🚀
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
