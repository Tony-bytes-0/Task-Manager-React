import { Router } from "express";
import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from "../controller/tasks.controller.js";

const router = Router();

router.get("/tasks", findAll);
router.post("/tasks", create);
router.get("/tasks/:id", findOne);
router.put("/tasks/:id", update);
router.delete("/tasks/:id", remove);

export default router;
