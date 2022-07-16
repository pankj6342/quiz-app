import { useState } from "react";
// import { axios } from "axios";
const axios = require("axios");

export const useTestPage = () => {
  const host = 5000;
  const [questionArray, setQuestionArray] = useState([]);

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

  const fetchAllQuestions = async () => {
    try {
      // console.log("hello");
      const resp = await axios.get(`http://localhost:5000/api/question/get`);
      // console.log(resp.data);
      setQuestionArray(resp?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { questionArray, fetchAllQuestions, createQuestion };
};
