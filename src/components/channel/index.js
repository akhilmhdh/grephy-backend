import { Router } from "express";

import channelController from "./channelController";

const router = Router();

router.post("/create", channelController.createChannel);

router.post("/read/:id", channelController.readChannel);

router.post("/list", channelController.listChannel);

router.post("/update", channelController.updateChannel);

router.post("/delete", channelController.deleteChannel);
