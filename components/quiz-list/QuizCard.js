export const QuizCard = () => {
  return (
    <div className="flex divide-x-2 items-center justify-between bg-white w-[600px] h-[100px] p-2">
      <div className="h-[90px] w-[90px] p-5 text-center bg-yellow-500 rounded-full ">
        Coding Test
      </div>

      <div className="flex flex-col p-2">
        <span className="font-bold text-xl">All India Test Series</span>
        <small className="italic text-gray-500">Conducted by - Coding Ninjas</small>
      </div>

      <div className="flex space-x-2 items-center p-2">
        Starting in 1:00 hr **
        <button className="bg-green-400 rounded-full p-3">Start Now</button>
      </div>
    </div>
  );
};
