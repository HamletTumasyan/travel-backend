import { Router } from "express";
import upload from "../middlewares/upload.js";
import * as packageController from "../controllers/homePagePackages.js";

const router = Router();

router.get("/", packageController.listPage);
router.get("/create", packageController.createPage);
router.get("/:id", packageController.detailPage);
router.post('/bulk-delete',packageController.bulkDelete);
router.post("/add", upload.single("image"), packageController.add);
router.post("/edit/:id", upload.single("image"), packageController.edit);

export default router;