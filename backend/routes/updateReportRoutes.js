import express from "express";
import { createReport, listReports, markReportRead, deleteReport } from "../controllers/updateReportController.js";

const router = express.Router();

router.post("/", createReport);
router.get("/", listReports);
router.patch("/:id/read", markReportRead);
router.delete("/:id", deleteReport);

export default router;

