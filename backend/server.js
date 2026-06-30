import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js";
import topicRoutes from "./routes/topics.js";
import problemRoutes from "./routes/problems.js";
import progressRoutes from "./routes/progress.js";
import executionRoutes from "./routes/execution.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/topics", topicRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/execute", executionRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

sequelize
  .sync()
  .then(() => {
    console.log("Database connected & synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);
    process.exit(1);
  });
