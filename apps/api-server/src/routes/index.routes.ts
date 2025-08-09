import { Router } from "express";
import type { Request, Response } from "express";
import {sendSuccess} from "@myorg/shared"
const mainRoutes = Router();
mainRoutes.get("/status",(req:Request,res:Response)=>{
    sendSuccess(res,{status:"OK",service:"api-server"},"Status Ok");
})

export default mainRoutes;