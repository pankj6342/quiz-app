const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/quiz-app?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const connectToMongo = async () => {
  await mongoose
    .connect(mongoURI, { bufferCommands: false })
    .then(console.log("Connected to mongo sunccessfully"))
    .catch((e) => console.log(e));
};

module.exports = connectToMongo;
