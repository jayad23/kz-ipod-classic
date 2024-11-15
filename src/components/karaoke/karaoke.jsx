import axios from "axios";
import { PlayerContext } from "../../contexts/player";
import { useState, useEffect, useContext } from 'react';
import { CloseIcon } from "../../assets/icons/close";

const KaraokeComponent = ({ onClose }) => {
  const { currentSong } = useContext(PlayerContext);
  const [lyrics, setLyrics] = useState(["Finding lyrics..."]);

  useEffect(() => {
    setLyrics(["Finding lyrics..."]);
    if (currentSong && currentSong.songName && currentSong.artist) {
      const { songName, artist } = currentSong;
      const artistName = artist.includes("/") ? artist.split("/")[0] : artist;
      axios.get(`https://lyrist.vercel.app/api/${songName}/${artistName}`)
        .then((res) => {
          const splitted = res.data.lyrics.split("\n");
          setLyrics(splitted);
          // eslint-disable-next-line no-unused-vars
        }).catch((err) => {
          setLyrics(["Lyric not found"]);
        });
    }
  }, [currentSong]);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full z-50 flex justify-center"
    >
      <div style={{ WebkitOverflowScrolling: "unset", background: "rgb(0 0 0 / 62%)" }} className="w-full bg-white overflow-auto relative">
        <div className="sticky top-0 w-full flex justify-end p-2">
          <button>
            <CloseIcon color="rgba(32,198,190,1)" onClick={onClose} width={20} height={20} />
          </button>
        </div>
        <div style={{ width: "93%" }} className="absolute top-0 pl-1">
          <div>
            {
              lyrics.map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    fontWeight: row.includes("[") ? "bolder" : "normal",
                    color: row.includes("[") ? "rgba(32,198,190,1)" : "white"
                  }}>
                  {row}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaraokeComponent;
