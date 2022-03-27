import express, {NextFunction, Request, Response} from "express";
import router from "./routes";
import * as dotenv from "dotenv";

dotenv.config()

const app = express();



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)


app.get("/", function (req, res) {
    res.send("Hello world")
})

app.listen(4000)