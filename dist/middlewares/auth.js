"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY);
            res.status(200).json({ decodedToken: decodedToken });
            /*
            const userId:number = decodedToken.userId;
            if (req.body.userId && req.body.userId !== userId) {
                throw 'Invalid user ID';
            } else {
                req.auth = {userId}
                next();
                console.log("Not authorization set")
            }*/
        }
        else {
            res.status(404).json({ err: "No autho header set" });
        }
    }
    catch (_a) {
        res.status(401).json({
            error: new Error('Invalid request !')
        });
    }
};
exports.auth = auth;
