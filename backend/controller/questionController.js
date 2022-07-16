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

module.exports = { createQuestion, getAllQuestions };
