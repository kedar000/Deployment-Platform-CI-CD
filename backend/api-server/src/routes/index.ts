import { Router } from "express";

const router = Router();

router.get("/status", (_req, res) => res.json({ ok: true, service: "api-server" }));

export default router;