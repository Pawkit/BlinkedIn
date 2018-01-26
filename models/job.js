const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: { type: String, required: true },
  uid: { type: String, required: true },
  company: { type: String, required: true },
  salary: { type: Number, required: true },
  notes: String
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
