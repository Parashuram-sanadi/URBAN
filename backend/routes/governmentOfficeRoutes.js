import express from "express";
import { listOffices, getOffice, createOffice, updateOffice, deleteOffice } from "../controllers/governmentOfficeController.js";

const router = express.Router();

router.get("/", listOffices);
router.get("/:id", getOffice);
router.post("/", createOffice);
router.put("/:id", updateOffice);
router.delete("/:id", deleteOffice);

export default router;






