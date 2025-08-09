import express from "express"
import type { Application, Response,Request } from "express";
import mainRoutes from "./routes/index.routes";
const app : Application  = express();
app.use("/api/v1",mainRoutes);
app.use("/",(req:Request,res:Response)=>{
    return res.status(200).json("HI FROM SERVER");
})



export default app;

