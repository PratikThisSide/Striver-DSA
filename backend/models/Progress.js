import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Progress = sequelize.define("Progress", {
  sessionId: { type: DataTypes.STRING, allowNull: false, unique: true },
  solvedProblems: { type: DataTypes.JSONB, defaultValue: [] },
  topicProgress: { type: DataTypes.JSONB, defaultValue: {} },
  dailyStreak: {
    type: DataTypes.JSONB,
    defaultValue: { currentStreak: 0, lastActiveDate: "", totalActiveDays: 0 },
  },
  lastUpdated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default Progress;
