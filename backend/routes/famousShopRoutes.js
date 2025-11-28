import express from "express";
import { listFamousShops, getFamousShop, createFamousShop, updateFamousShop, deleteFamousShop } from "../controllers/famousShopController.js";

const router = express.Router();

router.get("/", listFamousShops);
router.get("/:id", getFamousShop);
router.post("/", createFamousShop);
router.put("/:id", updateFamousShop);
router.delete("/:id", deleteFamousShop);

export default router;

