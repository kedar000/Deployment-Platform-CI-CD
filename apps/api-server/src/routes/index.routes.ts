import { Router } from "express";
import type { Request, Response } from "express";
import {sendSuccess} from "@myorg/shared"
import { logger } from "@myorg/shared";
const mainRoutes = Router();
mainRoutes.get("/status",(req:Request,res:Response)=>{
    logger.info("Hi");
    logger.error("error");
    logger.debug("error");
    sendSuccess(res,{status:"OK",service:"api-server"},"Status Ok");
})

export default mainRoutes;