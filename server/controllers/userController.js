import mongoose from "mongoose";
import Users from "../models/userModel.js";
import { application } from "express";
import Application from "../models/ApplicationModel.js";

// upload resume
export const uploadResume = async(req,res)=>{
  try {
    const {url} = req.body;
    // console.log(url)
    const userResume = await Users.findOneAndUpdate({_id:req.body.user.userId},{cvUrl:url})
    if(!userResume){
      return res.status(404).json({
        success:false,
        message:'Problem while uploding resume'
      })
    }
    res.status(200).json({
      success:true,
      message:'resume updated',
      user:userResume
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      success:false,
    })
  }
}
// update user details
export const updateUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
      accountType,
      contactNumber,
      profileUrl,
      cvUrl,
      currentJobRole,
      currentSalary,
      currentCompany,
      currentLocation,
      openToRelocate,
      joinConsulting,
      about,
      experience,
      skills,
      appliedJobs
  } = req.body;

  try {
    if (!firstName || !lastName || !email || !contact || !jobTitle || !about ||!cvUrl||!experience || !skills) {
      next("Please provide all required fields");
    }

    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No User with id: ${id}`);
    }

    const updateUser = {
      accountType,
      contactNumber,
      profileUrl,
      cvUrl,
      currentJobRole,
      currentSalary,
      currentCompany,
      currentLocation,
      openToRelocate,
      joinConsulting,
      about,
      experience,
      skills,
      appliedJobs
    };

    const user = await Users.findByIdAndUpdate(id, updateUser, { new: true });

    const token = user.createJWT();

    user.password = undefined;

    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// get user using token
export const getUser = async (req, res, next) => {
  try {
    const id = req.body.user.userId;
    console.log(id)
    const user = await Users.findById({ _id: id });

    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const getUsers =async(req,res)=>{
  try {
    // const id = req.body.user.userId;
    // console.log(id)
    const users = await Users.find({});

    if (!users) {
      return res.status(200).send({
        message: "Users Not Found",
        success: false,
      });
    }

    // user.password = undefined;

    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
}

// register user
export const register = async (req, res, next) => {
  // const { firstName, lastName, email, password } 
  // {
  //   accountType,contactNumber,profileUrl,cvUrl,currentJobRole,currentSalary,currentCompany,currentLocation,openToRelocate,joinConsulting,about,experience,skills,appliedJobs}
  const {
    firstName,
    lastName,
    email,
    password,
    joinConsulting,
      openToRelocate,
      currentSalary,
      currentJobRole,
      contactNumber,
      currentLocation,
      currentCompany,
      skills,
      appliedJobs,
  }= req.body;
  console.log(currentJobRole)
  //validate fileds

  if (!firstName) {
    next("First Name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!lastName) {
    next("Last Name is required");
  }
  if (!password) {
    next("Password is required");
  }

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Address already exists");
      return;
    }

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password,
      joinConsulting,
      openToRelocate,
      currentSalary,
      currentJobRole,
      contactNumber,
      currentLocation,
      currentCompany,
      skills,
      appliedJobs,
    });

    // user token
    const token = await user.createJWT();
    user.password=null;
    res.status(201).send({
      success: true,
      message: "Account created successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// login user 
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //validation
    if (!email || !password) {
      next("Please Provide AUser Credentials");
      return;
    }

    // find user by email
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      next("Invalid -email or password");
      return;
    }

    // compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success:false,
        msg:"wrong password",
      })
    }

    user.password = undefined;

    const token = user.createJWT();

    res.status(202).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// delete user account  and delete all application he/she applied
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.body.user.userId;
    console.log(id)
    const user = await Users.findById({ _id: id });

    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }
    // user application

    const userApplication = await Application.deleteMany({applicant:id})

    const deleteUser = await Users.findByIdAndDelete({_id:id});

    res.status(200).json({
      success: true,
      deletedUser:deleteUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while deleting",
      success: false,
      error: error.message,
    });
  }
};






