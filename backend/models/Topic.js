import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Topic = sequelize.define("Topic", {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  level: {
    type: DataTypes.ENUM("basics", "intermediate", "advanced"),
    allowNull: false,
  },
  order: { type: DataTypes.INTEGER, allowNull: false },
  theory: { type: DataTypes.JSONB, defaultValue: {} },
  problemCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  icon: { type: DataTypes.STRING, defaultValue: "📘" },
});

export default Topic;
