import { Router } from "express";
import type { Request, Response } from "express";
import {sendSuccess} from "@myorg/shared"

import githubRoute from "./auth.github";
import { githubToken } from "../controllers/auth.github.controller";
import { logger } from "@myorg/shared";
import authRoutes from "./auth.routes";

const mainRoutes = Router();
mainRoutes.use("/auth",authRoutes);
mainRoutes.use('/auth', githubRoute)
mainRoutes.get("/status",(req:Request,res:Response)=>{
    logger.info("Hi");
    logger.error("error");
    logger.debug("error");
    sendSuccess(res,{status:"OK",service:"api-server"},"Status Ok",201);
})

export default mainRoutes;