import { Router } from "express";
import type { Request, Response } from "express";
import {sendSuccess} from "@myorg/shared"
import githubRoute from "./auth.github";
import { githubToken } from "../controllers/auth.github.controller";


const mainRoutes = Router();
mainRoutes.use('/auth', githubRoute)
mainRoutes.get("/status",(req:Request,res:Response)=>{
    sendSuccess(res,{status:"OK",service:"api-server"},"Status Ok");
})

export default mainRoutes;