import type { Request,Response } from "express";
import { config } from "../config";
import axios from "axios"
import {ApiError,asyncHandler, sendSuccess} from "@myorg/shared"
import { verifyGoogleIdToken } from "../utils/verifyGoogleToken.utils";
import { DecodedGoogleUser } from "../types/decodedGoogleUser.types";
import { logger } from "@myorg/shared";
import { prisma } from "@myorg/shared";
import AuthProvider from "@shared/db";

export const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.googleOAuthClientId}` +
    `&redirect_uri=${encodeURIComponent(config.googleRedirectUrl)}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile`;
  res.redirect(redirectUrl);
});


export const googleCallback = asyncHandler(async(req:Request,res:Response)=>{
   const {code} = req.query;
   if(!code){
    throw new ApiError("Missing Authorization",400);
   }
     const token = await axios.post("https://oauth2.googleapis.com/token",{
            client_id:config.googleOAuthClientId,
            client_secret:config.googleOAuthClientSecret,
            code: code,
            grant_type:"authorization_code",
            redirect_uri:config.googleRedirectUrl
    });

    const {access_token,refresh_token,id_token} = token.data;
    const decodedUser = await verifyGoogleIdToken(id_token)
    const user = await prisma.user.findUnique({
      where:{
        googleId:decodedUser.sub
      }
    })
    if(!user){
      const newUser = await prisma.user.create({
        data:{
          name:decodedUser.name,
          email:decodedUser.email,
          authProvider:AuthProvider.google
        }
      })
    }
    sendSuccess<DecodedGoogleUser>(res,decodedUser,"google auth success",200);
})

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