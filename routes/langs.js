import {Router} from "express";
import * as langController from "../controllers/langs.js";

const router = Router();

router.get("/", langController.listPage);
router.get("/create", langController.createPage);
router.get("/:id", langController.detailPage);
router.post('/bulk-delete',langController.bulkDelete);
router.post("/add", langController.add);
router.post("/edit/:id", langController.edit);

export default router;