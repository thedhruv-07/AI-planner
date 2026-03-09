import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/*
========================================
GET ALL TASKS (only logged-in user's)
========================================
*/
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

/*
========================================
CREATE TASK
========================================
*/
router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      completed: false,
      user: req.user.id,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

/*
========================================
TOGGLE COMPLETE
========================================
*/
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    console.log("Decoded user:", req.user);
    console.log("Task ID:", req.params.id);

    const task = await Task.findById(req.params.id);
    console.log("Task from DB:", task);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("Task.user:", task.user.toString());
    console.log("Token user:", req.user.id);

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});
/*
========================================
EDIT TASK TITLE
========================================
*/
router.put("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title: req.body.title },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to edit task" });
  }
});

/*
========================================
DELETE TASK
========================================
*/
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;