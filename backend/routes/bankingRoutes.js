import express from "express";
import { listBankings, getBanking, createBanking, updateBanking, deleteBanking } from "../controllers/bankingController.js";

const router = express.Router();

router.get("/", listBankings);
router.get("/:id", getBanking);
router.post("/", createBanking);
router.put("/:id", updateBanking);
router.delete("/:id", deleteBanking);

export default router;

