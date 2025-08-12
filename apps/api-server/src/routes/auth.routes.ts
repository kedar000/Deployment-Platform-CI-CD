import { Router } from "express";
import { googleAuth,googleCallback,githubToken,githubeConnect } from "../controllers/auth.controllers";
 const authRoutes = Router();
 authRoutes.get("/google",googleAuth);
 authRoutes.get("/google/callback",googleCallback);
 authRoutes.get('/github', githubeConnect)
 authRoutes.get('/github/callback' , githubToken)
export default authRoutes