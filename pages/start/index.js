import { useEffect, useState } from "react";
import { QuizCard } from "../../components/quiz-list/QuizCard.js";
import { useTestPage } from "../../customHooks/useTestPage.js";

const Start = () => {
  const { testList, fetchTest } = useTestPage();
  useEffect(() => {
    if (testList.length === 0) {
      fetchTest();
    }
    console.log(testList);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="font-family-cursive text-4xl text-center pb-4 border-b-2 ">
        Available Quizes
      </div>

      <div className="flex flex-col m-auto bg-gray-100 backdrop-blur-md min-h-screen">
        <div
          id="test-list"
          className="min-w-full flex flex-col space-y-2 divide-y-2 items-center align-center border-white"
        >
          {/* {testList.length === 0 ? (
            <>No Active Test Available Currently</>
          ) : ( */}
          <>
            {testList.map((e) => {
              return (
                <QuizCard
                  testId={e._id}
                  key={e._id}
                  title={e.title}
                  creator={e.creator.name}
                  startTime={e.startTime}
                  endTime={e.endTime}
                />
              );
            })}
          </>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};
export default Start;
