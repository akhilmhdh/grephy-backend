import { Router } from "express";

import graphController from "./graphController";

const router = Router();

router.post("/create", graphController.createGraph);

router.get("/read/:id", graphController.readGraph);

router.get("/update", graphController.updateGraph);

router.post("/delete", graphController.deleteGraph);

export default router;
