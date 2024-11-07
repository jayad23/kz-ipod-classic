import classnames from "classnames";
import { Loading } from "../../assets/icons/loading";

const ConfirmationModal = ({ confirm_options, confirmOptionIndex, savingPreference }) => {
  return (
    <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="flex flex-col items-left w-[85%] h-[auto] bg-white p-3 rounded-md">

        <h3 className="text-xs text-center font-semibold text-slate-600">
          🔔 CONFIRM YOUR ACTIONS FIRST
        </h3>
        <ul className="mt-2">
          {
            confirm_options.map((text, index) => (
              <li
                key={text.id}
                style={{
                  padding: "3px 10px",
                  color: index === confirmOptionIndex ? "white" : "#5f5959",
                  fontWeight: index === confirmOptionIndex ? "bold" : "normal",
                }}
                className={classnames("text-xs text-gray-600 active:scale-95 flex items-center justify-between", { ["item-selected"]: index === confirmOptionIndex })}
              >
                <span>
                  {text.text}
                </span>
                {
                  index === confirmOptionIndex && savingPreference && (
                    <span>
                      <Loading />
                    </span>
                  )
                }
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default ConfirmationModal;
