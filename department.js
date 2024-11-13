import express from "express";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getDepartments,
} from "../controllers/departmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addDepartment);
router.get("/", authMiddleware, getDepartments);
router.put("/:id", authMiddleware, editDepartment); // Ensure this line is correct
router.delete("/:id", authMiddleware, deleteDepartment);

export default router;
