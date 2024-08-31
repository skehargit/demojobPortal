import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUser, updateUser,register, signIn,deleteUser,uploadResume,getUsers, toggleJobLike } from "../controllers/userController.js";

const router = express.Router();

//register user
router.post("/register", register);

// login user
router.post("/login", signIn);

// GET user
router.get("/get", userAuth, getUser);

router.get("/users",getUsers)

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUser);

router.delete("/delete",userAuth,deleteUser);

router.post("/upload-resume",userAuth,uploadResume)

router.post('/togglelike',userAuth,toggleJobLike)

export default router;