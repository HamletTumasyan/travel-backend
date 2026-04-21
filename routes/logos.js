import {Router} from "express";
import * as logoController from "../controllers/logos.js";

const router = Router();

router.get("/", logoController.listPage);
router.get("/create", logoController.createPage);
router.get("/:id", logoController.detailPage);
router.post('/bulk-delete',logoController.bulkDelete);
router.post("/add", logoController.add);
router.post("/edit/:id", logoController.edit);

export default router;