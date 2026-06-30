import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Problem = sequelize.define("Problem", {
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  difficulty: {
    type: DataTypes.ENUM("easy", "medium", "hard"),
    allowNull: false,
  },
  tags: { type: DataTypes.JSONB, defaultValue: [] },
  topicSlug: { type: DataTypes.STRING, allowNull: false },
  statement: { type: DataTypes.TEXT, allowNull: false },
  inputFormat: { type: DataTypes.TEXT, allowNull: false },
  outputFormat: { type: DataTypes.TEXT, allowNull: false },
  constraints: { type: DataTypes.TEXT, allowNull: false },
  sampleTestCases: { type: DataTypes.JSONB, defaultValue: [] },
  hiddenTestCases: { type: DataTypes.JSONB, defaultValue: [] },
  bruteSolution: { type: DataTypes.TEXT, defaultValue: "" },
  optimalSolution: { type: DataTypes.TEXT, defaultValue: "" },
  explanation: { type: DataTypes.TEXT, defaultValue: "" },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
});

export default Problem;
