import { Router } from "express";
import { githubeConnect, githubToken } from "../controllers/auth.github.controller";

const githubRoute = Router()

githubRoute.get('/github' , githubeConnect)
githubRoute.get('/github/callback' , githubToken)

export default githubRoute;