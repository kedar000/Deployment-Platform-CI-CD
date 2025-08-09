import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();
const app = express();
app.use(express.json());

// mount routes folder (example)
app.use("/api", routes);

app.get("/", (_req, res) => res.send("API Server OK"));

const PORT = process.env.PORT || 4000;
const url = `http://localhost:${PORT}`
app.listen(PORT, () => console.log(`API Server listening on ${PORT} , url : ${url}`));

// app.listen(PORT, () => console.log(`Webhook listener on ${PORT} , url : ${url}`));