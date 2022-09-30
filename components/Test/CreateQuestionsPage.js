import { useEffect, useState } from "react";
import { useTestPage } from "../../customHooks/useTestPage";
import { CreateQuestionsModal } from "./CreateQuestionModal";
import { useRouter } from "next/router";
import { ReviewModal } from "./ReviewModal";

export const CreateQuestionsPage = (testId) => {
  const [qList, setQList] = useState([]);
  const router = useRouter();
  // const [testData, setTestData] = useState({});
  const { currTestData } = useTestPage();
  useEffect(() => {
    if (!testId) {
      testId = router.query.testId;
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setReviewModal] = useState(false);

  const { updateTest } = useTestPage();
  const addQuesLocal = (data) => {
    const newList = [...qList, data];
    // console.log({ newList, data });
    setQList(newList);
  };

  const addQuesToDB = async () => {
    await updateTest(testId, { questions: qList });
  };

  return !showReviewModal ? (
    <div className="w-[90%] min-h-[60vh] m-auto shadow-md flex flex-col items-center">
      <div className="flex items-center w-full justify-between px-3">
        <div className="text-2xl uppercase text-center shadow-sm py-1 px-5">
          {currTestData?.title || "Create Test"}
        </div>
        <button
          onClick={() => {
            addQuesToDB();
            setReviewModal(true);
          }}
          className="bg-white-100 py-1 px-3 border rounded-full justify-self-end hover:bg-green-300"
        >
          Finish
        </button>
      </div>
      <div className="flex flex-col w-[70%] space-y-2 mt-2">
        {qList.length === 0 ? (
          <div className="text-lg">No Questions Added</div>
        ) : (
          <>
            {qList?.map((e) => {
              // return <>hello</>;
              return <QCard data={e} />;
            })}
          </>
        )}
      </div>
      {!showModal ? (
        <button
          onClick={() => setShowModal(true)}
          className="mt-3 bg-white hover:bg-blue-400 py-1 px-4 rounded-full border"
        >
          Add New Question
        </button>
      ) : (
        <CreateQuestionsModal
          setShowModal={setShowModal}
          addQuesLocal={addQuesLocal}
        />
      )}
    </div>
  ) : (
    <ReviewModal setReviewModal={setReviewModal} />
  );
};

const QCard = ({ data }) => {
  return (
    <div className="flex flex-col py-2 px-2 w-full border shadow-sm">
      <div className="flex w-full justify-between ">
        <div className="font-bold">{data.title}</div>
      </div>
      <div>
        {data.description.length > 100
          ? data.description.substring(0, 100) + "..."
          : data.description}
      </div>

      <div className="flex items-center space-x-2">
        <div>1. {data?.options[0].label}</div>
        <div>2. {data?.options[1].label}</div>
        <div>3. {data?.options[2].label}</div>
        <div>4. {data?.options[3].label}</div>
      </div>
    </div>
  );
};
