const { isValidObjectId } = require("mongoose");
const Test = require("../models/Test");
const createTest = async (req, res) => {
  try {
    //pending: check if there are validation errors

    const {
      title,
      description,
      questions,
      creator,
      numQues,
      startTime,
      endTime,
    } = req.body;

    const newtest = new Test({
      title,
      description,
      questions,
      creator,
      numQues,
      startTime,
      endTime,
    });

    const savedTest = await newtest.save();
    res.json(savedTest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error while adding a new test");
  }
};
//pending: make creator dynamic:

const updateTest = async (req, res) => {
  try {
    // const {
    //   title,
    //   description,
    //   questions,
    //   creator,
    //   numQues,
    //   startTime,
    //   endTime,
    // } = req.body;
    const data = req.body;
    const newTest = {};

    //fetch the new values from req and assign to newTest

    // if (title) {
    //   newTest.title = title;
    // }
    // if (description) {
    //   newTest.description = description;
    // }
    // if (questions) {
    //   newTest.questions = questions;
    // }
    // if (numQues) {
    //   newTest.numQues = numQues;
    // }
    // if (startTime) {
    //   newTest.startTime = startTime;
    // }
    // if (endTime) {
    //   newTest.endTime = endTime;
    // }

    //access the required note
    const testId = req?.query?.testId;
    console.log("testId req", testId);
    let test = await Test.findById(testId);
    console.log("test", test, "questions", data.questions);
    // let test = await Test.findById("62ece133a02ea9ba06b7f821");
    //here id:
    //1. passed with the request as a parameter
    //2. id of the test stored and != user

    //if no test exists with this id:

    if (!test) {
      return res.status(404).send("test with given id Not Found");
    }

    //pending :
    //verify whether the user sending req is owner of the note
    // if (note.user.toString() !== req.user.id) {
    //   return res.status(401).send("Acess Denied");
    // }

    //if everything is fine=> update the test:

    test = await Test.findOneAndUpdate(
      { _id: testId },
      { $set: { questions: data.questions } },
      { new: true }
    ); //this is syntax
    res.json(test);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error while updating the test");
  }
};

const getCreatedTest = async (req, res) => {
  try {
    //pending: make creator dynamic
    const alltests = await Test.find({
      creator: {
        name: "pankaj",
        id: "1",
      },
    });
    res.json(alltests);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("error while fetching created tests");
  }
};

const getAllTest = async (req, res) => {
  try {
    //pending: make creator dynamic
    const testId = req?.query?.testId;
    // console.log({ testId });
    const query = {};
    if (testId) {
      query._id = testId.toString();
      console.log(testId);
    }
    const alltests = await Test.find(query);
    res.json(alltests);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("error while fetching tests");
  }
};

const getTestData = async (req, res) => {
  try {
    const { id } = req.body;
    const testData = await Test.findById(id);
    res.json(testData);
  } catch (error) {
    console.log({ getTestDataError: error });
  }
};
//pending: create a user model and then link all attempted tests:

module.exports = {
  createTest,
  getCreatedTest,
  getAllTest,
  updateTest,
  getTestData,
};
