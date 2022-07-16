const mongoose = require("mongoose");
const { Schema } = mongoose;

const OptionSchema = new Schema({
  id: { type: string },
  label: { type: string },
});

const Option = mongoose.model("Option", OptionSchema);
Option.createIndexes;
module.exports = Option;
