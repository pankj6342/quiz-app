const Question = require("../models/Question");
const axios = require("axios");

const createQuestion = async (req, res) => {
  try {
    //pending: check if there are validation errors

    const { title, description, correctOption, creator, options, index } =
      req.body;

    const newquestion = new Question({
      index,
      title,
      description,
      correctOption,
      options,
      creator,
    });

    const savedQuestion = await newquestion.save();
    // const idx = Number(savedQuestion.correctOption);
    // const correctOptionVal = savedQuestion.options[idx];

    res.json(savedQuestion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error while adding a new question");
  }
};

const getAllQuestions = async (req, res) => {
  try {
    //pending: make creator dynamic
    const allquestions = await Question.find({
      creator: {
        name: "pankaj",
        id: "1",
      },
    });
    res.json(allquestions);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

const submitAnswers = async (req, res) => {
  try {
    let score = 0;
    const quesList = await Question.find({
      creator: {
        name: "pankaj",
        id: "1",
      },
    });

    // console.log("backend", quesList);
    const answerList = req.body.answerList;

    if (answerList) {
      Object.keys(answerList).forEach((qId) => {
        const ansId = answerList[qId];
        const q = quesList.find((e) => String(e._id) === qId);
        const correctIndex = Number(q?.correctOption);
        const correctAnsId = q?.options[correctIndex - 1]._id;
        console.log({ ansId, correctAnsId });

        if (ansId === String(correctAnsId)) score = score + 1;
      });
    }
    res.json(score);
  } catch (error) {
    console.log({ submitAnswersError: error.message });
  }
};

module.exports = { createQuestion, getAllQuestions, submitAnswers };
