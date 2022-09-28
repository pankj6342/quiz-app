import { useEffect, useState } from "react";
import { useTestPage } from "../../customHooks/useTestPage";

export const Test = ({ testId }) => {
  testId = String(testId);
  const {
    questionArray,
    fetchAllQuestions,
    answerList,
    setAnswerList,
    saveAnswer,
    submitTest,
  } = useTestPage();

  const [qId, setQId] = useState(questionArray[0]?._id);
  const qIndex = questionArray?.findIndex((e) => String(e._id) == qId);
  const onLoad = async () => {
    // console.log("load");
    await fetchAllQuestions(testId);
    setQId(questionArray[0]?._id);
  };

  useEffect(() => {
    if (questionArray.length) {
      setQId(questionArray[0]?._id);
    } else onLoad();

    let storedAns = localStorage.getItem("answerList");
    if (storedAns) {
      setAnswerList(JSON.parse(storedAns));
      console.log("refresh ", JSON.parse(storedAns));
    }
  }, []);

  const questionData = questionArray?.find((e) => e._id === qId);
  const optionArray = questionData?.options;

  const onSubmit = async () => {
    await submitTest();
    console.log("submitted");
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
                />
              </>
            );
          })}
        </div>

        <div className="flex flex-col w-full rounded-xl divide-y-4 min-h-screen">
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
            className="flex w-full flex-col divide-y-2 space-y-2 h-[35vh] overflow-y-auto bg-white mt-2 rounded-xl p-4"
          >
            {optionArray?.map((e, key) => {
              return (
                <>
                  <OptionCard
                    id={String(e._id)}
                    index={key}
                    label={e.label}
                    qId={qId}
                    setAnswerList={setAnswerList}
                    answerList={answerList}
                    saveAnswer={saveAnswer}
                  />
                </>
              );
            })}
          </div>

          <div className="flex w-full items-center justify-evenly space-x-2 bg-white h-20 rounded-xl mx-4 ">
            <button
              disabled={qIndex === 0}
              onClick={() => {
                setQId(questionArray[qIndex - 1]?._id);
              }}
              className="disabled:bg-gray-100 rounded-full p-4 border font-bold w-[300px]"
            >
              Previous
            </button>
            {qIndex === questionArray?.length - 1 ? (
              <button
                onClick={() => {
                  onSubmit();
                }}
                className="align-self-end  border hover:bg-green-400 rounded-full p-4 font-bold w-[300px] disabled:bg-gray-300"
              >
                Save and Submit
              </button>
            ) : (
              <button
                onClick={() => {
                  setQId(questionArray[qIndex + 1]?._id);
                }}
                disabled={qIndex === questionArray?.length - 1}
                className=" rounded-full p-4 border font-bold w-[300px] disabled:bg-gray-300"
              >
                Next
              </button>
            )}
            <button
              onClick={() => {
                setAnswerList((prev) => {
                  const { [qId]: _, ...rest } = prev;
                  console.log({ rest });
                  return rest;
                });
              }}
            >
              Clear Selection
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const PalletCard = ({ index, title, qId, id, setQId }) => (
  <>
    <div
      onClick={() => {
        if (id !== qId) {
          setQId(id);
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

const OptionCard = ({
  id,
  index,
  label,
  setAnswerList,
  answerList,
  qId,
  saveAnswer,
}) => (
  <div
    onClick={() => {
      setAnswerList({ ...answerList, [qId]: id });
      var counter = 3;
      setTimeout(() => {
        saveAnswer();
        console.log({ answerList });
      }, 3000);
    }}
    className={`bg-${
      answerList[qId] === id ? "green-300" : "white"
    } w-full flex divide-x-2 space-x-3 items-center p-2 rounded-xl cursor-pointer`}
  >
    <div id="option-number">{index + 1}</div>
    <div id="option-desc " className="p-2">
      {label}
    </div>
  </div>
);
