const mongoose = require("mongoose");
const { Schema } = mongoose;

//pending: thumbnail of test
const QuestionSchema = {
  index: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  options: {
    type: [
      {
        id: String,
        label: String,
      },
    ],
  },
  correctOption: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  creator: {
    name: String,
    id: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
};

const TestSchema = new Schema({
  testId: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  creator: {
    type: Object,
    required: true,
  },
  questions: [
    {
      type: QuestionSchema,
    },
  ],
  numQues: {
    type: String,
    required: true,
  },
  // startTime: {
  //   type: String,
  //   required: true,
  // },
  // endTime: {
  //   type: String,
  //   required: true,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Test = mongoose.model("test", TestSchema);
Test.createIndexes;
module.exports = Test;
