import { useEffect, useState } from "react";
import { useTestPage } from "../../customHooks/useTestPage";

export const CreateQuestionsModal = ({ setShowModal, addQuesLocal }) => {
  const { createQuestion, updateTest } = useTestPage();
  const [state, setState] = useState({
    title: "",
    description: "",
    options: [{}, {}, {}, {}],
    correctOption: "",
  });
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // const data =
  }, []);

  const onOptionChange = (e) => {
    const index = Number(e.target.id);
    const prev = state.options;
    const newOptions = prev;
    const val = { id: e.target.id, label: e.target.value };
    newOptions[index - 1] = val;
    // const replaceAt = index-1;
    // const newOptions = [
    //   ...prev.slice(0, replaceAt),
    //   val,
    //   ...prev.slice(replaceAt + 1),
    // ];
    // const prev = state.options;
    // const updated = Object.assign([], prev, { [index - 1]: val });
    //0 based indexing

    setState({
      ...state,
      options: newOptions,
    });
  };

  const onSubmit = () => {
    console.log(state);
    // createQuestion(state);
    // updateTest({questions:})
    addQuesLocal(state);
    setShowModal(false);
  };

  return (
    <div className="fixed flex justify-center inset-0 backdrop-blur-sm">
      <div className="bg-white m-auto w-[50%] overflow-y-auto flex flex-col items-center p-2 rounded-4xl shadow-md ">
        <button
          onClick={() => {
            setShowModal(false);
          }}
          className="place-self-end mr-2 border rounded-full p-2 hover:bg-gray-300"
        >
          Cancel
        </button>
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
          className="text-xl py-1 px-3 mt-2 bg-green-300 rounded-full"
        >
          Add Question
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
    <div className="flex flex-col space-y-3 w-full items-center">
      <div id="title" className=" p-1">
        <label className="text-2xl">Question Title</label>
        <input
          name="title"
          value={state.title}
          onChange={onChange}
          type="text"
          className="text-xl font-bold uppercase w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </div>
      <div id="description" className="p-1">
        <label className="text-md">Question Description</label>
        <textarea
          name="description"
          value={state.description}
          onChange={onChange}
          cols="35"
          className="min-w-full min-h-[150px] max-h-[150px] bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-x-20 items-between p-1">
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
