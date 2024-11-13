import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import express from "express";
import { connectToDatabase } from "./config/db.js";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import leavesRouter from "./routes/leaverequest.js";

const app = express();
connectToDatabase();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/leaves", leavesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
