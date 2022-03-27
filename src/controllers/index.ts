import {IindexController} from "../interfaces";
import {Response, Request} from "express";
import bcrypt, {hash} from "bcrypt"
import {db} from "../utils/db";
import jwt, {Secret} from "jsonwebtoken";


export const registerUserController = (req:Request, res:Response) => {

    const body = req.body as unknown as IindexController;
    bcrypt.hash(body.password, 10)
        .then(hash => {
            const dataToPost = {
                firstname:body.firstname,
                lastname:body.lastname,
                age:body.age,
                email:body.email,
                password:hash
            } as IindexController;

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
            res.json({data: dataToPost})
        })



}

export const loginUserController = (req:Request, res:Response) => {
    const result:IindexController = {
        id:251,
        firstname:"bob",
        lastname:"Test",
        age:12,
        email:"test@test.com",
        password:"$2b$10$WNUBSHegvrcc80zIDvSApeMBOe/GMIy17VwxYGjETokWqbV.jPJ.K"
    }

    try{
        const body = req.body as unknown as IindexController;

        console.log(body)
        console.log(result.password)
        bcrypt.compare(body.password, result.password)
            .then(valid => {
                res.status(200).json({
                    userId: result.id,
                    token: jwt.sign(
                        { userId: result.id, userEmail: result.email},
                        process.env.PRIVATE_KEY as string,
                        { expiresIn:'24h'}
                    )
                });
            }).catch(err => {
                res.status(401).json({error:"Erreur - Mauvais mdp"})
        })
    } catch (err) {
        res.status(404).json({err:"Erreur bcrypt"})
    }

}

export const testController = (req : Request, res: Response) => {
    res.json({message : "Welcome here, granted people !"})
}