import Task from "../models/Task.js";
import dotenv from "dotenv";
dotenv.config();

const checkUID = (user) => {
  const { uid } = user;
  if (!uid) {
    return res.status(401).json({
      success: false,
      error: "Authentication required",
    });
  }
  return uid;
};

//* Get all the tasks the user has
const getTasksController = async (req, res) => {
  const uid = checkUID(req.user);
  try {
    // get all the tasks user has
    const userTasks = await Task.findAll({ where: { uid } });
    return res.status(200).json({
      success: true,
      tasks: userTasks,
    });
  } catch (err) {
    console.log("Error while retrieving tasks", err);
    return res.status(500).json({
      success: false,
      message: "Error while retrieving tasks",
    });
  }
};

//* Add a new task for the user
const addTasksController = async (req, res) => {
  const uid = checkUID(req.user);
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      error: "Task title is required",
    });
  }
  try {
    // Create the tasl
    const newTask = await Task.create({
      title,
      description: description || "",
      uid,
    });
    return res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (err) {
    console.log("Error while creating task : ", err);
    return res.status(500).json({
      success: false,
      error: "failed to create task",
    });
  }
};

const updateTaskCompletionController = async (req, res) => {
  try {
    const { uid } = req.user;
    const { tid } = req.params;
    const { completed } = req.body;

    if (!tid) {
      res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }
    const task = await Task.findOne({
      where: { tid: tid, uid },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Invalid task id",
      });
    }

    // update the task status accordingly
    task.completed = completed !== undefined ? completed : !task.completed;
    await task.save();

    // return success message
    return res.status(200).json({
      success: true,
      message: `Task marked as ${task.completed ? "completed" : "incomplete"}`,
    });
  } catch (err) {
    console.error("Error updating task completion status:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to update task completion status",
    });
  }
};

//* Delete a Task
const deleteTaskController = async (req, res) => {
  try {
    const { uid } = req.user;
    const { tid } = req.params;
    if (!tid) {
      res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
    }
    // Find the task to ensure it exists and belongs to the user
    const task = await Task.findOne({
      where: { tid, uid },
    });

    // delete the specific task
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or you don't have permission to delete it",
      });
    }

    // Delete the task
    await task.destroy();
    // Log the action for Azure Application Insights
    console.log(
      JSON.stringify({
        event: "TaskDeleted",
        userId: uid,
        taskId: tid,
        timestamp: new Date().toISOString(),
      })
    );

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting task:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to delete task",
    });
  }
};
export {
  getTasksController,
  addTasksController,
  updateTaskCompletionController,
  deleteTaskController,
};
