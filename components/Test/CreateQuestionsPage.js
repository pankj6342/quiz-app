import { useState } from "react";
import { useTestPage } from "../../customHooks/useTestPage";
export const CreateQuestionsPage = () => {
  const { createQuestion } = useTestPage();

  const [state, setState] = useState({
    title: "",
    description: "",
    options: [{}, {}, {}, {}],
    correctOption: "",
  });
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onOptionChange = (e) => {
    const index = Number(e.target.id);
    const val = { id: e.target.id, label: e.target.value };
    const prev = state.options;
    const updated = Object.assign([], prev, { [index - 1]: val });
    //0 based indexing

    setState({
      ...state,
      options: updated,
    });
  };

  const onSubmit = () => {
    console.log(state);
    // console.log("returned value");
    createQuestion(state);
  };

  return (
    <div className="">
      <div className="flex flex-col items-center p-5">
        <QuestionCard
          state={state}
          onChange={onChange}
          onOptionChange={onOptionChange}
        />
        <button
          onClick={onSubmit}
          disabled={
            state.title &&
            state.desciption &&
            state.correctOption &&
            state.options
          }
          className="text-2xl py-1 px-3 mt-2 bg-green-300 rounded-full"
        >
          Submit
        </button>
        {/* <div className="w-[50%] mt-2 flex items-center justify-evenly">
          <button className="text-xl py-1 px-3 bg-green-300 rounded-full">
            Previous
          </button>
          <span className="text-xl text-blue-800">1/10</span>
          <button className="text-xl py-1 px-3 bg-green-300 rounded-full">
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

const QuestionCard = ({ state, onChange, onOptionChange }) => {
  return (
    <div className="flex flex-col space-y-3 w-full items-center border p-2">
      <div id="title" className="w-[50%] border p-1">
        <label className="text-2xl">Question Title</label>
        <input
          name="title"
          value={state.title}
          onChange={onChange}
          type="text"
          className="text-xl font-bold uppercase w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </div>
      <div id="description" className="w-1/2 p-1">
        <label className="text-md">Question Description</label>
        <textarea
          name="description"
          value={state.description}
          onChange={onChange}
          cols="10"
          className="min-w-full min-h-[150px] max-h-[150px] bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-x-20 items-between w-[50%] p-1">
        <Option state={state} onOptionChange={onOptionChange} num={1} />
        <Option state={state} onOptionChange={onOptionChange} num={2} />
        <Option state={state} onOptionChange={onOptionChange} num={3} />
        <Option state={state} onOptionChange={onOptionChange} num={4} />
      </div>

      <label>Correct Option</label>
      <select
        name="correctOption"
        defaultValue={1}
        required={true}
        value={state.correctOption}
        onChange={onChange}
        className="w-[200px] bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
  );
};

const Option = ({ num, state, onOptionChange }) => {
  return (
    <>
      <div className="flex flex-col min-w-full">
        <label className="">Option {num}</label>
        <textarea
          id={num}
          onChange={onOptionChange}
          value={state?.options[num]?.label}
          maxLength={100}
          className="p-2 min-h-[50px] max-h-[50px] w-full bg-gray-200 text-gray-700 border rounded py-3 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
        />
      </div>
    </>
  );
};
