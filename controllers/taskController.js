import Task from '../models/Task.js';
import dotenv from "dotenv";
dotenv.config();

//* Get all the tasks the user has 
const getTasksController = async (req,res) => {
    const { uid } = req.user;
    if (!uid ) {
        return res.status(401).json({
            success: false,
            error: "Authentication required"
        });
    }
    try {
        // get all the tasks user has 
        const userTasks = await Task.findAll({ where : {uid} })
        return res.status(200).json({
            success: true,
            tasks: userTasks
        })
    } catch (err ){
        console.log("Error while retrieving tasks",err)
        return res.status(500).json({
            success: false,
            message: "Error while retrieving tasks"
        })
    }
}

//* Add a new task for the user
const addTasksController = async(req,res) =>{
    const { uid, username } = req.user;
    if (!uid || !username) {
        return res.status(401).json({
            success: false,
            error: "Authentication required"
        });
    }
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({
            success: false,
            error: "Task title is required"
        });
    }
    try {
        // Create the tasl
        const newTask = await Task.create({
            title,
            description : description || "",
            uid,
        })
        return res.status(201).json({
            success: true,
            message: "Task created successfully",
        })
    } catch (err) {
        console.log("Error while creating task : ",err);
        return res.status(500).json({
            success: false,
            error: "failed to create task"
        })
    }
 }
export {
    getTasksController,
    addTasksController
}