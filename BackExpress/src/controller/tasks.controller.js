import { v4 } from "uuid";
import { getConnection } from "../database.js";

// find all tasks
export const findAll = (req, res) => {
  const tasks = getConnection().data.tasks;

  return res.send(tasks);
};

// creating a task
export const create = async (req, res) => {
  const newTask = {
    id: v4(),
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const db = getConnection();
    db.data.tasks.push(newTask);
    await db.write();

    return res.json(newTask);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// find one task
export const findOne = (req, res) => {
  const task = getConnection().data.tasks.find(
    (task) => task.id === req.params.id
  );

  if (!task) return res.sendStatus(404);

  return res.send(task);
};

// updating a task
export const update = async (req, res) => {
  const db = getConnection();
  const updateTask = db.data.tasks.find((task) => task.id === req.params.id);

  if (!updateTask) return res.sendStatus(404);

  updateTask.name = req.body.name;
  updateTask.description = req.body.description;

  db.data.tasks.map((task) => task.id === req.params.id ? updateTask : task);

  await db.write();

  res.send(updateTask);
};

// deleting a task
export const remove = async (req, res) => {
  const db = getConnection();
  const task = db.data.tasks.find((task) => task.id === req.params.id);

  if (!task) return res.sendStatus(404);

  const remove = db.data.tasks.filter((task) => task.id !== req.params.id);
  db.data.tasks = remove;

  await db.write();

  res.json({
    message: "task deleted",
    task: task,
  });
};
