// models/Department.js
import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/db.js";

const Department = sequelize.define(
  "Department",
  {
    dep_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "departments",
    timestamps: false,
  }
);

export default Department;
