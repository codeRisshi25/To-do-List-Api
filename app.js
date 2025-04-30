import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, testConnection } from './config/sequelizeConfig.js';
import User from './models/User.js';
import Task from './models/Task.js'
import dbSync from './config/syncData.js'

dotenv.config();
const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "todo-list api" });
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ 
      message: 'User created successfully',
      userId: user.uid 
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

const startApp = async () => {
  try {
    await testConnection();
    // Sync databases according to Models
    dbSync();
    try {
      const user = await User.create({
        username: 'john_doe',
        password: '123pass',
      });
      console.log('user created', user);
    } catch (err) {
      console.log("Note about test user creation:", err.message);
    }
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`API running on PORT ${PORT}`);
    }).on('error', (err) => {
      console.error("Error at server startup:", err.message);
      db.close().then(() => console.log("Database connection closed"))
        .catch(err => console.error("Error closing db:", err));
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1);
  }
};

// Start the application
startApp();