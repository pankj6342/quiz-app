import { useEffect } from "react";
import { useTestPage } from "../customHooks/useTestPage";

const Result = () => {
  const { testId, result, setResult } = useTestPage();
  useEffect(() => {}, [result]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-gray-100">
      <div className="w-[70%] h-[60%] text-3xl flex flex-col items-center space-y-8 text-center border shadow-md">
        <h2 className="text-green-400">Your Score is</h2>
        <h1 className="text-8xl">{result || 1}</h1>
      </div>
    </div>
  );
};

export default Result;
