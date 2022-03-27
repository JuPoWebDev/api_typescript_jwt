"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testController = exports.loginUserController = exports.registerUserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUserController = (req, res) => {
    const body = req.body;
    bcrypt_1.default.hash(body.password, 10)
        .then(hash => {
        const dataToPost = {
            firstname: body.firstname,
            lastname: body.lastname,
            age: body.age,
            email: body.email,
            password: hash
        };
        /*
        let query = "INSERT INTO user VALUES('" +
            +dataToPost.firstname+"','" +
            +dataToPost.lastname+"'," +
            +dataToPost.age +",'" +
             +dataToPost.email+"','" +
             + hash +
            " ')";
        db.query(query, (err:Error, result : IindexController) => {
            if (err) {
                res.status(404).json(err)
            }
            else if (!err) {
                res.status(201).json(result)
            }
        })*/
        res.json({ data: dataToPost });
    });
};
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => {
    const result = {
        id: 251,
        firstname: "bob",
        lastname: "Test",
        age: 12,
        email: "test@test.com",
        password: "$2b$10$WNUBSHegvrcc80zIDvSApeMBOe/GMIy17VwxYGjETokWqbV.jPJ.K"
    };
    try {
        const body = req.body;
        console.log(body);
        console.log(result.password);
        bcrypt_1.default.compare(body.password, result.password)
            .then(valid => {
            res.status(200).json({
                userId: result.id,
                token: jsonwebtoken_1.default.sign({ userId: result.id, userEmail: result.email }, process.env.PRIVATE_KEY, { expiresIn: '24h' })
            });
        }).catch(err => {
            res.status(401).json({ error: "Erreur - Mauvais mdp" });
        });
    }
    catch (err) {
        res.status(404).json({ err: "Erreur bcrypt" });
    }
};
exports.loginUserController = loginUserController;
const testController = (req, res) => {
    res.json({ message: "Welcome here, granted people !" });
};
exports.testController = testController;
