import express from "express"
import dotenv from "dotenv"
import app from "./app"
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 4000;
const url = `http://localhost:${PORT}`
app.listen(PORT, () => console.log(`API Server listening on ${PORT} , url : ${url}`));
