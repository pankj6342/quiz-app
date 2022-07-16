import { useState } from "react";
export const CreateTestPage = () => {
  const [state, setState] = useState({
    testName: "",
    numQues: 10,
    startTime: new Date().toLocaleTimeString(),
    endTime: new Date().toLocaleTimeString(),
    date: new Date().toDateString(),
  });
  const onChange = (e) => {
    console.log(state);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col divide-y-2 space-y-4 inset-0 items-center justify-center">
      <div>
        <h1 className="text-2xl">Enter Your Test Details</h1>
      </div>
      <div id="form" className="pt-5 w-[50%] flex flex-col items-center">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Test Title
              </label>
              <input
                value={state.testName}
                name="testName"
                onChange={onChange}
                className="uppercase appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Number of Questions
              </label>
              <input
                value={state.numQues}
                name="numQues"
                onChange={onChange}
                className=" block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="number"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date of test
              </label>
              <input
                value={state.date}
                name="date"
                onChange={onChange}
                className=" block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="Date"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="w-[40%]">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Start Time of Test
              </label>
              <input
                value={state.startTime}
                name="startTime"
                onChange={onChange}
                className=" block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="time"
              />
            </div>
            <div className="w-[40%] ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                End Time of Test
              </label>
              <input
                value={state.endTime}
                name="endTime"
                onChange={onChange}
                className=" block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="Time"
              />
            </div>
          </div>
          <button className="p-3 rounded-md bg-green-300 w-full" type="submit">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};
