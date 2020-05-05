import { Router } from "express";

import userController from "./userController";

const router = Router();

router.get("/auth/google", userController.googleAuth);
router.get("/auth/google/callback", userController.googleAuthCallback);

router.get("/auth/github", userController.githubAuth);
router.get("/auth/github/callback", userController.githubAuthCallback);

router.get("/logout", userController.logOut);

export default router;
