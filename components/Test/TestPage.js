import { useEffect, useState } from "react";
import { useTestPage } from "../../customHooks/useTestPage";

export const Test = (testId) => {
  const onLoad = async () => {
    await fetchAllQuestions();
    setQArray(questionArray);
  };
  useEffect(() => {
    onLoad();
  }, [qArray]);

  const { questionArray, fetchAllQuestions } = useTestPage();
  const [qArray, setQArray] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const questionData = qArray[qIndex];
  const optionArray = questionData?.options;

  console.log({ optionArray });
  const [selected, setSelected] = useState(0);

  const onOptionClick = (id) => {
    if (selected === id) setSelected(0);
    else setSelected(id);
  };

  return (
    <>
      <div className="flex divide-x-4 items-center p-2">
        <div
          id="ques-pallet"
          className="min-h-screen sticky min-w-[25vw] rounded-xl bg--300 flex flex-col space-y-2 divide-y-1 p-2"
        >
          <div className="text-md px-2 flex items-center justify-evenly">
            <div className="h-[20px] w-[20px] rounded-full bg-green-500"></div>
            <span>Answered</span>
            <div className="h-[20px] w-[20px] rounded-full bg-orange-500"></div>
            <span>Review</span>
            <div className="h-[20px] w-[20px] rounded-full bg-gray-500"></div>
            <span>Not visited</span>
          </div>
          {qArray?.map((e, index) => {
            return (
              <>
                <PalletCard
                  qIndex={index}
                  title={e.title}
                  setQIndex={setQIndex}
                />
              </>
            );
          })}
        </div>

        <div className="flex flex-col max-w-[72vw] rounded-xl divide-y-4 min-h-screen">
          <div
            id="Question-Detail"
            className="flex flex-col space-y-2  bg-white p-2 mt-0 rounded-md"
          >
            <div
              id="q-title"
              className="text-3xl uppercase font-bold shadow-md p-2 px-4"
            >
              {questionData?.title}
            </div>

            <div
              id="q-desc"
              className="h-[40vh] overflow-y-auto italic text-gray-700 p-4"
            >
              {questionData?.description}
            </div>
          </div>

          <div
            id="options"
            className="flex flex-col divide-y-2 space-y-2 h-[35vh] overflow-y-auto bg-white mt-2 rounded-xl p-4"
          >
            {optionArray?.map((e) => {
              return (
                <>
                  <OptionCard
                    id={e.id}
                    label={e.label}
                    onOptionClick={onOptionClick}
                    selected={selected}
                  />
                </>
              );
            })}
          </div>

          <div className="flex items-center justify-center space-x-2 bg-white h-20 rounded-xl mx-4 ">
            <button className="bg-gray-500 rounded-full p-4 text-white font-bold w-[300px]">
              Previous
            </button>
            <button
              disabled={selected === 0}
              className="bg-green-500 rounded-full p-4 text-white font-bold w-[300px] disabled:bg-gray-300"
            >
              Save and Next
            </button>
            {/* <button className="bg-orange-500 rounded-full p-4 text-white font-bold w-[300px]">
              Save and Mark for review
            </button> */}
            <button onClick={() => setSelected(0)}>Clear Selection</button>
          </div>
        </div>
      </div>
    </>
  );
};

const PalletCard = ({ qIndex, title, color, setQIndex }) => (
  <>
    <div
      onClick={() => {
        setQIndex(qIndex);
      }}
      className="flex items-center space-x-2 border p-2 shadow-md hover:bg-gray-200 cursor-pointer"
    >
      <div className="font-bold text-md ">{qIndex + 1 + "."}</div>
      <div className="font-bold text-md uppercase">{title}</div>
      {/* <div className={`h-[20px] w-[30px] rounded-full bg-${color}-500`}></div> */}
    </div>
  </>
);

const OptionCard = ({ id, label, onOptionClick, selected }) => (
  <div
    onClick={() => {
      onOptionClick(id);
    }}
    className={`bg-${
      selected === id ? "green-500" : "white"
    } w-full flex divide-x-2 space-x-3 items-center p-2 rounded-xl cursor-pointer`}
  >
    <div id="option-number">{id}</div>
    <div id="option-desc " className="p-2">
      {label}
    </div>
  </div>
);
