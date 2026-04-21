import { Router } from "express";
import * as logoutController from "../controllers/adminLogout.js";

const router = Router();

router.get("/", logoutController.logout);

export default router;