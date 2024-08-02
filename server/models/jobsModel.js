import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: { type: Schema.Types.ObjectId, ref: "Companies" },
    application: [{ type: Schema.Types.ObjectId, ref: "Application" }],
    jobTitle: { type: String, required: [true, "Job Title is required"] },
    jobType: { type: String},
    location: { type: String, required: [true, "Location is required"] },
    salary: { type: Number, required: [true, "Salary is required"] },
    experience: { type: Number, default: 0 },
    detail: [{ desc: { type: String }, requirements: { type: String,default:"" } }],
    requiredSkills:[String],
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