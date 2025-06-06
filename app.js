import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db , testConnection } from "./config/sequelizeConfig.js";
import { login, signup , logout } from "./routes/authRoutes.js";
import { getTasks, addTasks, updateTaskCompletion , deleteTask } from './routes/taskRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/',login);
app.use('/',signup);
app.use('/',logout);
app.use('/tasks',addTasks);
app.use('/tasks',getTasks);
app.use('/tasks',updateTaskCompletion)
app.use('/tasks',deleteTask);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.get("/", (req, res) => {
  res.json({ message: "todo-list api" });
});

// Start the server
app
  .listen(PORT, () => {
    console.log(`API running on PORT ${PORT}`);
    testConnection();
  })
  .on("error", (err) => {
    console.error("Error at server startup:", err.message);
    db.close()
      .then(() => console.log("Database connection closed"))
      .catch((err) => console.error("Error closing db:", err));
    db.close();
    process.exit(1);
  });
