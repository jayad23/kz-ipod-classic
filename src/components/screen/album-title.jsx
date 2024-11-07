import { Fragment } from "react";

const AlbumTitle = ({ name }) => {
  // const [bgColor, setBgColor] = useState("");

  // useEffect(() => {
  //   const colors = ["bg-emerald-500", "bg-blue-500", "bg-red-500", "bg-yellow-500", "bg-purple-500"];
  //   const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //   setBgColor(randomColor);
  // }, []);
  return (
    <Fragment>
      {
        name ? (
          <div
            style={{ borderRadius: "0px 0px 8px 8px" }}
            //className={`w-full text-center absolute bottom-[-9px] left-0 overflow-hidden ${bgColor}`}
            className="w-full text-center absolute bottom-[-9px] left-0 overflow-hidden bg-slate-900"
          >
            <span
              className="text-sm font-bold text-slate-200 uppercase"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {name || ""}
            </span>
          </div>
        ) : null
      }
    </Fragment>
  );
};

export default AlbumTitle;
