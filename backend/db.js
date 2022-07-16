const mongoose = require("mongoose");

// const mongoURI =
//   "mongodb+srv://admin:admin@collegeknot.gpmfw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoURI =
  "mongodb://localhost:27017/quiz-app?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// "mongodb+srv://panda:panda@cluster0.4oeu3.mongodb.net/quizApp?retryWrites=true&w=majority";
const connectToMongo = async () => {
  await mongoose
    .connect(mongoURI, { bufferCommands: false })
    .then(console.log("Connected to mongo sunccessfully"))
    .catch((e) => console.log(e));
};

module.exports = connectToMongo;
