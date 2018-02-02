const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  uid: { type: String, required: true },
  title: { type: String, required: true },
  dateApplied: { type: Date, default: new Date() },
  companyName: { type: String, required: true },
  companyContact: String,
  companyWebsite: String,
  companyFacts: String,
  jobRequirements: String,
  jobResponsibilities: String,
  callBack: Boolean,
  interview: Boolean,
  dateInterview: { type: Date, default: new Date() },
  nameOfInterviewer: String,
  qualifications: String,
  benifits: String,
  salary: { type: Number, required: true },
  notes: String,
  lastUpdate: { type: Date, default: new Date() }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
