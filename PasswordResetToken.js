import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
const PasswordResetToken = sequelize.define(
  "PasswordResetToken",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    tableName: "password_reset_tokens",
  }
);

PasswordResetToken.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

export default PasswordResetToken;
