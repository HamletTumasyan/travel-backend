import {Router} from "express";
import * as homePagePckgsHeadController from "../controllers/homePagePckgsHead.js";

const router = Router();

router.get("/", homePagePckgsHeadController.listPage);
router.get("/create", homePagePckgsHeadController.createPage);
router.get("/:id", homePagePckgsHeadController.detailPage);
router.post('/bulk-delete',homePagePckgsHeadController.bulkDelete);
router.post("/add", homePagePckgsHeadController.add);
router.post("/edit/:id", homePagePckgsHeadController.edit);

export default router;