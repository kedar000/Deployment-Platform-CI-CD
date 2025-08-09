import express from "express";
const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
// CRUD routes to save/retrieve encrypted envs (left as TODO)

app.listen(4200, () => console.log("Env service on 4200"));