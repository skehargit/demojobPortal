import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: { type: Schema.Types.ObjectId, ref: "Companies",required: true },
    application: [{ type: Schema.Types.ObjectId, ref: "Application" }],
    jobTitle: { type: String, required: [true, "Job Title is required"] },
    location: { type: String, required: [true, "Location is required"] },
    salary: { type: String},
    isSalaryConfidential: {
      type: Boolean,
      default: false,
  },
  description: {
    type: String,
    required: true,
},
requirements: [
  {
      type: String,
  },
],
qualifications: [
  {
      type: String,
  },
],
screeningQuestions: [
  {
      question: {
          type: String,
          required: true,
      },
      isMandatory: {
          type: Boolean,
          default: false,
      },
  },
],
    experience: { type: Number, default: 0 },
    companyType:{type:String},
    screeningQuestions:[String],
    maxApplicants:{
      type:Number,
    },
    duration:{
      type:String,
      defult:"permanent"
    },
    poastingDate:{
      type:Date,
      default:Date.now
    }
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;