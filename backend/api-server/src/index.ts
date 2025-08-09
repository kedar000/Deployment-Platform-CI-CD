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
app.listen(PORT, () => console.log(`API Server listening on ${PORT}`));