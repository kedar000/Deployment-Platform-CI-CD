import express from "express"
import type { Application, Response,Request } from "express";
import mainRoutes from "./routes/index.routes";
import { errorHandler } from "@myorg/shared/middlewares/error.middleware"
import { ApiError } from "@myorg/shared/Errors/ApiError";
// import { loggerStream } from "@myorg/shared";
import cors from "cors"
import morgan from "morgan"


const app : Application  = express();
app.use(cors({
    origin:"*"
}));
// app.use(morgan("combined",{stream:loggerStream}));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1",mainRoutes);
app.use("/",(req:Request,res:Response)=>{
    throw new ApiError("INTERNAL_SERVER_ERROR",500)
})
app.use(errorHandler);
export default app;
