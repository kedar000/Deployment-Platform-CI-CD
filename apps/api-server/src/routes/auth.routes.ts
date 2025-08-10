import { Router } from "express";
import { googleAuth,googleCallback } from "../controllers/auth.controllers";
 const authRoutes = Router();
 authRoutes.get("/google",googleAuth);
 authRoutes.get("/google/callback",googleCallback);
export default authRoutes