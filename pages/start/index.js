import { QuizCard } from "../../components/quiz-list/QuizCard.js";

const Start = () => {
  return (
    <div className="min-h-screen">
      <div className="text-4xl text-center pb-4 border-b-2 ">
        Start the quiz
      </div>

      <div className="flex flex-col m-auto bg-slate-500 min-h-screen">
        <h3 className="text-white text-3xl text-center">Available Quizes</h3>

        <div
          id="test-list"
          className="min-w-full flex flex-col space-y-2 divide-y-2 items-center align-center border-white"
        >
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
          <QuizCard />
        </div>
      </div>
    </div>
  );
};
export default Start;
