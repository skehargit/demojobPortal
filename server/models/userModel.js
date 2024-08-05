import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"],
    },
    email: {
      type: String,
      required: [true, " Email is Required!"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      // minlength: [2, "Password length should be greater than 2 character"],
      select: true,
    },
    accountType: { type: String, default: "seeker" },
    contactNumber: { type: String,default:'undefined' },
    profileUrl: { type: String },
    cvUrl: { type: String },
    currentJobRole: { type: String,required:true},
    currentSalary: {
      type: Number,
      default:"undefined"
    },
    currentCompany: {
      type: String,
      default:'undefined'
    },
    currentLocation: { type: String,
      default:'india'
     },
    openToRelocate: {
      type: String,
      enum: ["YES", "NO"],
      default: "YES",
    },
    joinConsulting: {
      type: String,
      enum: ["Post Graduation", "Lateral"],
      default: "Post Graduation",
    },
    about: { type: String },
    experience: {
      type: Number,
      default:1,
    },
    skills: [String],
    appliedJobs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  { timestamps: true }
);

// middelwares
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//JSON WEBTOKEN
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Users = mongoose.model("Users", userSchema);

export default Users;
