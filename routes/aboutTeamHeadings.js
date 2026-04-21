import {Router} from "express";
import * as aboutTeamHeadingsController from "../controllers/aboutTeamHeadings.js";

const router = Router();

router.get("/", aboutTeamHeadingsController.listPage);
router.get("/create", aboutTeamHeadingsController.createPage);
router.get("/:id", aboutTeamHeadingsController.detailPage);
router.post('/bulk-delete',aboutTeamHeadingsController.bulkDelete);
router.post("/add", aboutTeamHeadingsController.add);
router.post("/edit/:id", aboutTeamHeadingsController.edit);

export default router;