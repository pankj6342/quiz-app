import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const axios = require("axios");

export const useTestPage = () => {
  const port = process.env.PORT || 5000;
  const router = useRouter();
  const [questionArray, setQuestionArray] = useState([]);
  const [answerList, setAnswerList] = useState({}); //map quesToAns
  const [testId, setTestId] = useState(null);
  const [testList, setTestList] = useState([]);
  const [currTestData, setCurrTestData] = useState(null);
  const [result, setResult] = useState();
  const production = "";
  const development = "http://localhost:5000/";
  // const host = process.env.NODE_ENV ? production : development;
  const host = "http://localhost:5000";
  useEffect(() => {
    if (!testId) {
      const id = router.query?.testId;
      setTestId(id);
      console.log("set testid", testId);
    }
  }, []);

  useEffect(() => {
    if (result != null) router.push("/result", "/result", { shallow: true });
  }, [result]);

  const createTest = async (data) => {
    try {
      //pending: make creator dynamic:
      //pending: make host dynamic
      const resp = await axios.post(`${host}/api/test/create`, {
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
      const resp = await axios.get(`${host}/api/test/get/${query}`);
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
        `${host}/api/test/update/?testId=${testId}`,
        data
      );
      console.log("updated ");
    } catch (error) {
      console.log({ updateTestError: error.message });
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
        const testData = await axios.get(`${host}/api/test/get/${query}`);
        if (testid) setCurrTestData(testData?.data[0]);
        console.log("fetched", testData?.data[0]);
        const questions = testData?.data[0]?.questions;
        // console.log(questions);
        setQuestionArray(questions);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveAnswer = () => {
    let answers = answerList;
    localStorage.setItem("answerList", JSON.stringify(answers));
    console.log("local ", localStorage.getItem("answerList"));
  };

  const submitTest = async (testid) => {
    try {
      if (!testid) testid = testId;
      const resp = await axios.post(
        `${host}/api/test/submit/?testId=${testid}`,
        {
          answerList,
        }
      );
      console.log("submit resp", resp?.data);
      setResult(resp?.data);
    } catch (error) {
      console.log({ submitTestError: error.message });
    }
  };

  return {
    questionArray,
    fetchAllQuestions,
    answerList,
    setAnswerList,
    saveAnswer,
    createTest,
    updateTest,
    testList,
    fetchTest,
    result,
    submitTest,
  };
};
