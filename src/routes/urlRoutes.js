import express from "express";
import {
  shortenUrl,
  redirectUrl,
  getUrlStats,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", shortenUrl);

router.get("/:shortId", redirectUrl);

router.get("/stats/:shortId", getUrlStats);

export default router;
