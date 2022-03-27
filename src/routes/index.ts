import express from "express";
import {loginUserController, registerUserController, testController} from "../controllers";
import {auth} from "../middlewares/auth";


const router = express.Router()

//router.get("/login", loginController)
//router.post("/login", checkCredentialsController)
//router.get("/sign-up", signupController)
router.post("/sign-up", registerUserController)
router.post("/login", loginUserController)
router.get("/test",auth, testController)


export default router