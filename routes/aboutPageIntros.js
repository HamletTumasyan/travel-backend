import {Router} from "express";
import * as aboutPageIntrosController from "../controllers/aboutPageIntros.js";

const router = Router();

router.get("/", aboutPageIntrosController.listPage);
router.get("/create", aboutPageIntrosController.createPage);
router.get("/:id", aboutPageIntrosController.detailPage);
router.post('/bulk-delete',aboutPageIntrosController.bulkDelete);
router.post("/add", aboutPageIntrosController.add);
router.post("/edit/:id", aboutPageIntrosController.edit);

export default router;