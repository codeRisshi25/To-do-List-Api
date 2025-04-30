import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, testConnection } from './config/sequelizeConfig.js';
import User from './models/User.js';
import Task from './models/Task.js'
import {dbSync} from './config/syncData.js'

dotenv.config();
const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(express.json());

//routes 
app.get('/health',(req,res)=>{
    res.status(200).json({status: "healthy"})
})

app.get('/', (req, res) => {
  res.json({ message: "todo-list api" });  
});  

// Start the server
app.listen(PORT, () => {
  console.log(`API running on PORT ${PORT}`);
}).on('error', (err) => {
  console.error("Error at server startup:", err.message);
  db.close().then(() => console.log("Database connection closed"))
    .catch(err => console.error("Error closing db:", err));
  process.exit(1);
});