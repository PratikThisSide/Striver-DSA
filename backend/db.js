import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_PATH || "./dsa_mastery.sqlite",
  logging: false,
  define: { underscored: true },
});

export default sequelize;
