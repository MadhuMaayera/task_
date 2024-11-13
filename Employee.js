import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Department from "./Department.js";
import User from "./User.js";

const Employee = sequelize.define(
  "Employee",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Department,
        key: "id",
      },
      allowNull: false,
    },
    salary: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "employees",
    timestamps: true,
  }
);

// Define associations
Employee.belongsTo(User, { foreignKey: "userId" });
Employee.belongsTo(Department, { foreignKey: "departmentId" });

export default Employee;
