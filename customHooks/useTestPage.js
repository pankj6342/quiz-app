import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const axios = require("axios");

export const useTestPage = () => {
  const host = 5000;
  const router = useRouter();
  const [questionArray, setQuestionArray] = useState([]);
  const [answerList, setAnswerList] = useState({});
  //pending: change this..
  const [testId, setTestId] = useState(null);
  const [testList, setTestList] = useState([]);
  const [currTestData, setCurrTestData] = useState(null);

  useEffect(() => {
    if (!testId) {
      const id = router.query?.testId;
      setTestId(id);
      console.log("set testid", testId);
    }
  }, []);

  const createTest = async (data) => {
    try {
      //pending: make creator dynamic:
      //pending: make host dynamic
      const resp = await axios.post(`http://localhost:5000/api/test/create`, {
        title: data?.title,
        description: data?.description,
        creator: {
          name: "Pankaj",
          id: "1",
        },
        questions: data?.questions,
        numQues: data?.numQues,
        startTime: data?.startTime,
        endTime: data?.endTime,
      });
      setTestId(String(resp.data?._id));
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const fetchTest = async (testid) => {
    try {
      const query = "";
      if (testid) query = `?testId=${testid}`;
      const resp = await axios.get(
        `http://localhost:5000/api/test/get/${query}`
      );
      setTestList(resp?.data);
    } catch (e) {
      console.log({ fetchTestError: e.message });
    }
  };

  const updateTest = async ({ testId }, data) => {
    try {
      // const { title, description, questions, numQues, startTime, endTime } =
      //   data;
      console.log(testId, data);
      if (!testId) {
        testId = router.query?.testId;
      }
      const resp = await axios.post(
        `http://localhost:5000/api/test/update/?testId=${testId}`,
        data
      );
      console.log("updated ");
    } catch (error) {
      console.log({ updateTestError: error.message });
    }
  };

  const createQuestion = async (data) => {
    try {
      //pending: make creator dynamic:

      const resp = await axios.post(
        `http://localhost:5000/api/question/create`,
        {
          index: data?.id,
          title: data?.title,
          description: data?.description,
          correctOption: data?.correctOption,
          options: data?.options,
          creator: {
            name: "pankaj",
            id: "1",
          },
        }
      );
      console.log(resp.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const fetchAllQuestions = async (testid) => {
    try {
      var query = "";
      if (testid) query = `?testId=${testid}`;
      if (currTestData) {
        const questions = currTestData?.questions;
        // console.log("data", currTestData);
        if (questions) setQuestionArray(questions);
      } else {
        const testData = await axios.get(
          `http://localhost:5000/api/test/get/${query}`
        );
        if (testid) setCurrTestData(testData?.data[0]);
        console.log("fetched", testData?.data[0]);
        const questions = currTestData?.questions;
        // console.log(questions);
        setQuestionArray(questions);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveAnswer = ({ qId, selected }) => {
    console.log({ qId, selected });
    setAnswerList({ ...answerList, [qId]: selected });
    console.log({ answerList });
    const toSave = answerList;
    JSON.stringify(toSave);
    console.log("stringify", toSave);
    localStorage.setItem(testId, toSave);
  };

  const onAnsSubmit = async () => {
    try {
      //pending: make creator dynamic:

      const resp = await axios.post(
        `http://localhost:5000/api/question/submit`,
        {
          answerList,
        }
      );
      console.log("score: ", resp.data);
    } catch (err) {
      // Handle Error Here
      console.error({ ansSubmitError: err.message });
    }
  };

  return {
    questionArray,
    fetchAllQuestions,
    createQuestion,
    answerList,
    saveAnswer,
    onAnsSubmit,
    createTest,
    updateTest,
    testList,
    fetchTest,
  };
};
