import { useEffect, useState } from "react";
import { useTestPage } from "../../customHooks/useTestPage";

export const Test = ({ testId }) => {
  testId = String(testId);
  const {
    questionArray,
    fetchAllQuestions,
    answerList,
    saveAnswer,
    onAnsSubmit,
  } = useTestPage();

  const [qId, setQId] = useState(null);
  const qIndex = questionArray?.findIndex((e) => String(e._id) == qId);
  const onLoad = async () => {
    // console.log("load");
    await fetchAllQuestions(testId);
    // setQArray(questionArray);
    setQId(questionArray[0]?._id);
  };

  useEffect(() => {
    // console.log("hello");
    onLoad();
  }, []);

  if (questionArray?.length === 0) onLoad();

  // console.log({ qIndex });
  const questionData = questionArray?.find((e) => e._id === qId);
  // console.log({ qId, questionData });
  const optionArray = questionData?.options;

  // console.log({ optionArray });
  const [selected, setSelected] = useState(null);
  //pending:............

  const onOptionClick = (id) => {
    if (selected === id) setSelected(null);
    else setSelected(id);
  };
  const onSubmit = async () => {
    await onAnsSubmit();
    console.log("submitted");
  };

  const onQuestionSwitch = (prev, next) => {
    // console.log({ qIndex });
    console.log({ prev, next });
    if (prev !== next) {
      setQId(String(questionArray[next]?._id));
      if (answerList[qId]) setSelected(answerList[qId]);
    }
  };
  return questionArray?.length === 0 ? (
    <>No questions to display</>
  ) : (
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
          {questionArray?.map((e, index) => {
            return (
              <>
                <PalletCard
                  index={index}
                  title={e.title}
                  qId={qId}
                  id={String(e._id)}
                  setQId={setQId}
                  onQuestionSwitch={onQuestionSwitch}
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
            {optionArray?.map((e, key) => {
              return (
                <>
                  <OptionCard
                    id={String(e._id)}
                    index={key}
                    label={e.label}
                    onOptionClick={onOptionClick}
                    selected={selected}
                  />
                </>
              );
            })}
          </div>

          {qId === questionArray?.[questionArray?.length - 1]?._id ? (
            <div>
              <button
                onClick={() => {
                  saveAnswer({ qId, selected });
                  onSubmit();
                }}
                disabled={selected === null}
                className="bg-green-500 rounded-full p-4 text-white font-bold w-[300px] disabled:bg-gray-300"
              >
                Save and Submit
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 bg-white h-20 rounded-xl mx-4 ">
              <button
                disabled={qIndex === 0}
                onClick={() => {
                  saveAnswer({ qId, selected });
                  // setQId(questionArray[qIndex - 1]?._id);
                  onQuestionSwitch(qIndex, qIndex - 1);
                }}
                className="bg-gray-500 disabled:bg-gray-200 rounded-full p-4 text-white font-bold w-[300px]"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  saveAnswer({ qId, selected });
                  // setQId(questionArray[qIndex + 1]?._id);
                  onQuestionSwitch(qIndex, qIndex + 1);
                }}
                disabled={selected === null}
                className="bg-green-500 rounded-full p-4 text-white font-bold w-[300px] disabled:bg-gray-300"
              >
                Save and Next
              </button>
              <button className="bg-orange-500 rounded-full p-4 text-white font-bold w-[300px]">
                Skip
              </button>
              <button onClick={() => setSelected(null)}>Clear Selection</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const PalletCard = ({ index, title, qId, id, setQId, onQuestionSwitch }) => (
  <>
    <div
      onClick={() => {
        if (id !== qId) {
          // setQId(id);
          onQuestionSwitch(qId, id);
        }
      }}
      className="flex items-center space-x-2 border p-2 shadow-md hover:bg-gray-200 cursor-pointer"
    >
      <div className="font-bold text-md ">{index + 1 + "."}</div>
      <div className="font-bold text-md uppercase">{title}</div>
      {/* <div className={`h-[20px] w-[30px] rounded-full bg-${color}-500`}></div> */}
    </div>
  </>
);

const OptionCard = ({ id, index, label, onOptionClick, selected }) => (
  <div
    onClick={() => {
      onOptionClick(id);
    }}
    className={`bg-${
      selected === id ? "green-500" : "white"
    } w-full flex divide-x-2 space-x-3 items-center p-2 rounded-xl cursor-pointer`}
  >
    <div id="option-number">{index + 1}</div>
    <div id="option-desc " className="p-2">
      {label}
    </div>
  </div>
);
