import express from "express";
import {
  addEmployee,
  getEmployee,
  upload,
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to add an employee
router.post("/add", authMiddleware, upload.single("image"), addEmployee);
router.get("/", authMiddleware, getEmployee);

export default router;
