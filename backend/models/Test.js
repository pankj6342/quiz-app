const mongoose = require("mongoose");
const Question = require("./Question");
const { Schema } = mongoose;

//pending: thumbnail of test

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
      type: Schema.Types.ObjectId,
      ref: "question",
    },
  ],
  numQues: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Test = mongoose.model("test", TestSchema);
Test.createIndexes;
module.exports = Test;
