import { Router } from "express";
import upload from "../middlewares/upload.js";
import * as sliderController from "../controllers/homePageSliders.js";

const router = Router();

router.get("/", sliderController.listPage);
router.get("/create", sliderController.createPage);
router.get("/:id", sliderController.detailPage);
router.post('/bulk-delete',sliderController.bulkDelete);
router.post("/add", upload.single("image"), sliderController.add);
router.post("/edit/:id", upload.single("image"), sliderController.edit);

export default router;