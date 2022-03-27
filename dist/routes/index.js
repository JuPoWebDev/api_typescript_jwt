"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
//router.get("/login", loginController)
//router.post("/login", checkCredentialsController)
//router.get("/sign-up", signupController)
router.post("/sign-up", controllers_1.registerUserController);
router.post("/login", controllers_1.loginUserController);
router.get("/test", auth_1.auth, controllers_1.testController);
exports.default = router;
