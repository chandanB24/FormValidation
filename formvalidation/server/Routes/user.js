import express from "express";
import db from "../Database/db.js";

const router = express.Router()

router.post('/register',(req,res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const mobile = req.body.mobile;
    const dob = req.body.dob;

    const sqlInsert = "INSERT INTO users (name,email,address,mobile,dob) VALUES (?,?,?,?,?);"
    db.query(sqlInsert,[name,email,address,mobile,dob],(err,result)=>{
        if(result){
            res.json({msg:"data inserted successfully"})
        }
        else{
            console.log(err)
        }
    })

})


export {router as userRouter}