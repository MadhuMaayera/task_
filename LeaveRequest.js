import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const LeaveRequest = sequelize.define("LeaveRequest", {
  leaveType: {
    type: DataTypes.ENUM("Sick Leave", "Vacation Leave", "Unpaid Leave"),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
    defaultValue: "Pending",
  },
  appliedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default LeaveRequest;
