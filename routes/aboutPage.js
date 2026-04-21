import { Router } from "express";
import * as aboutPageController from "../controllers/aboutPage.js";

const router = Router();

router.get("/", aboutPageController.listPage);

export default router;