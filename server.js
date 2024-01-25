import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./src/config/DB.config.js";
import EmployeeRouter from "./src/routes/EmployeeRoute.js";
const app = express();
connectDb()
app.use(cors({origin: "*"}))
app.use(express.json())
app.use("/api/employee", EmployeeRouter)
const PORT = process.env.PORT || 4001 
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})