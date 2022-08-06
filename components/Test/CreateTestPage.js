import { useState } from "react";
import { useRouter } from "next/router";
import { useTestPage } from "../../customHooks/useTestPage";
export const CreateTestPage = () => {
  const [state, setState] = useState({
    title: "",
    description: "",
    numQues: 10,
    startTime: new Date().toLocaleTimeString(),
    endTime: new Date().toLocaleTimeString(),
    date: new Date().toDateString(),
  });
  const router = useRouter();
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { createTest, testId } = useTestPage();
  const onSubmit = async (e) => {
    e.preventDefault();
    await createTest(state);
    var timer = 4;

    //pending: show loading screen here:
    while (!testId && timer--) {}
    if (timer == 0) {
      alert("Error while creating qustion");
      console.log("error while creating test");
    }
    router.push(`/create/${testId}`);
  };

  return (
    <div className="flex flex-col divide-y-2 space-y-4 inset-0 items-center justify-center">
      <div>
        <h1 className="text-2xl">Enter Your Test Details</h1>
      </div>
      <div id="form" className="pt-5 w-[50%] flex flex-col items-center">
        <form className="w-full max-w-lg" onSubmit={onSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Test Title
              </label>
              <input
                value={state.title}
                name="title"
                required
                onChange={onChange}
                className="uppercase appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Description
              </label>
              <input
                value={state.description}
                name="description"
                required
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
                required
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
                required
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
                required
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
