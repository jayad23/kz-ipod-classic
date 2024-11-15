import { Fragment } from "react";
import classnames from "classnames";

const AlbumTitle = ({ name }) => {
  return (
    <Fragment>
      {
        name ? (
          <div
            className={classnames("w-full text-center absolute bottom-[-9px] left-0 overflow-hidden", "glass")}
          >
            <span
              className="text-sm font-bold text-slate-900 uppercase"
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
