import { useRouter } from "next/router";
export const QuizCard = ({ testId, title, creator }) => {
  const router = useRouter();
  return (
    <div className="flex items-center space-x-2 justify-between bg-white w-[600px] h-[100px] p-2 rounded-md shadow-md">
      <div className="flex flex-col p-2">
        <div className="font-bold text-xl">{title}</div>
        <small className="italic text-gray-500">Conducted by - {creator}</small>
      </div>

      <div className="flex text-sm space-x-3 items-center p-2">

        <button
          onClick={() => {
            router.push(`/start/${testId}`);
          }}
          className="justify-self-end bg-green-400 rounded-full ml-2 p-3"
        >
          Start Now
        </button>
        
      </div>
    </div>
  );
};
