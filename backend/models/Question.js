const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema({
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
});

const Question = mongoose.model("question", QuestionSchema);
Question.createIndexes;
module.exports = Question;
