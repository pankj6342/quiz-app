const connectToMongo = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
connectToMongo();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const questionRoute = require("./routes/questionRoute");
const testRoute = require("./routes/testRoute");
const port = process.env.PORT || 5000;

//Available Routes(for custom backend)
app.use("/api/question", questionRoute);
app.use("/api/test", testRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
