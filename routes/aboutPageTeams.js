import { Router } from "express";
import upload from "../middlewares/upload.js";
import * as aboutPageTeamsController from "../controllers/aboutPageTeams.js";

const router = Router();

router.get("/", aboutPageTeamsController.listPage);
router.get("/create", aboutPageTeamsController.createPage);
router.get("/:id", aboutPageTeamsController.detailPage);
router.post('/bulk-delete',aboutPageTeamsController.bulkDelete);
router.post("/add", upload.single("image"), aboutPageTeamsController.add);
router.post("/edit/:id", upload.single("image"), aboutPageTeamsController.edit);

export default router;