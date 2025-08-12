import type { Request,Response } from "express";
import { config } from "../config";
import axios from "axios"
import {asyncHandler, sendSuccess} from "@myorg/shared"
import { ApiError , logger} from "@myorg/shared"



export const githubeConnect = asyncHandler(async (req: Request, res: Response) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${config.githubClientId}` +
    `&redirect_uri=${encodeURIComponent(config.githubRedirectURL)}` +
    `&response_type=code` +
    `&scope=${config.githubScopes}`;

  res.redirect(redirectUrl);
});


export const githubToken = asyncHandler(async(req:Request,res:Response)=>{
    const {code} = req.query;
    if(!code){
      throw new ApiError("Missing Authorization",400);
    }
    
    logger.info("Reached githubToken Function")
    const token = await axios.post("https://github.com/login/oauth/access_token",{
          client_id:config.githubClientId,
          client_secret:config.githubClientSecret,
          code: code,
          grant_type:"authorization_code",
          redirect_uri:config.githubRedirectURL
    });
    
    sendSuccess(res,token.data,"github auth success",200);
})