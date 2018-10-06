const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReportSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  //What time the ducks are fed
  dateoffed: {
    type: Date,
    required: true
  },

  //What food the ducks are fed
  foodtype: {
    type: String,
    required: true
  },

  //Where the ducks are fed
  where: {
    type: String,
    required: true
  },

  //How many ducks are fed
  howmanyducks: {
    type: Number,
    required: true
  },

  //What kind of food the ducks are fed
  kindfood: {
    type: String,
    required: true
  },

  //How much food the ducks are fed
  howmuchfood: {
    type: Number,
    required: true
  },

  name: {
    type: String
  },
  avatar: {
    type: String
  },
  dateofreport: {
    type: Date,
    default: Date.now
  }
});

module.exports = Report = mongoose.model("report", ReportSchema);
