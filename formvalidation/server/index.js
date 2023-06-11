import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { userRouter } from "./Routes/user.js";


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))


app.use('/',userRouter)

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
})