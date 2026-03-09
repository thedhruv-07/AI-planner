import Task from "../models/Task.js";

export const getTasks = async (req, res) => {

  const tasks = await Task.find({ user: req.user.id });

  res.json(tasks);

};

export const createTask = async (req, res) => {

  const task = await Task.create({
    title: req.body.title,
    user: req.user.id
  });

  res.json(task);

};

export const deleteTask = async (req, res) => {

  await Task.findByIdAndDelete(req.params.id);

  res.json({ message: "Task deleted" });

};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.completed = !task.completed;

    const updated = await task.save();

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const editTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.title = req.body.title || task.title;

    const updated = await task.save();

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Edit failed" });
  }
};