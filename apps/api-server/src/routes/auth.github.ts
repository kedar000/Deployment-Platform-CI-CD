import { Router } from "express";
import { githubeConnect, githubToken } from "../controllers/auth.github.controller";
import { prisma } from "@shared/db";

const githubRoute = Router()

githubRoute.get('/github' , githubeConnect)
githubRoute.get('/github/callback' , githubToken)

export default githubRoute;