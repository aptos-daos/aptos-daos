import express from "express";
import { InviteController } from "../controller/invite.controller";
import { auth } from "../middlewares/auth.middleware";
import { validateResponse } from "../middlewares/validate.middleware";

const router = express.Router();
const inviteController = new InviteController();

router.use(validateResponse);

router.post("/", auth, inviteController.createInvite);

router.get("/:code", inviteController.getInvite);

router.post("/validate", inviteController.validateInvite);

export default router;
