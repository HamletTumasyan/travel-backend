import { Router } from "express";
import * as contactPageController from "../controllers/contactPage.js";

const router = Router();

router.get("/", contactPageController.listPage);
router.get("/create", contactPageController.createPage);
router.get("/:id", contactPageController.detailPage);
router.post('/bulk-delete',contactPageController.bulkDelete);
router.post("/add", contactPageController.add);
router.post("/edit/:id", contactPageController.edit);

export default router;