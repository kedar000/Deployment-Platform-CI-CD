import express from "express";
const app = express();
app.use(express.json());

const PORT = 4200;
app.get("/health", (_req, res) => res.json({ ok: true }));
// CRUD routes to save/retrieve encrypted envs (left as TODO)

// app.listen(4200, () => console.log("Env service on 4200"));
const url = `http://localhost:${PORT}`
app.listen(PORT, () => console.log(`Env service on ${PORT} , url : ${url}`));