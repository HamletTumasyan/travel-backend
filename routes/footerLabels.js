import { Router } from "express";
import upload from "../middlewares/upload.js";
import * as footerLabelsController from "../controllers/footerLabels.js";

const router = Router();

router.get("/", footerLabelsController.listPage);
router.get("/create", footerLabelsController.createPage);
router.get("/:id", footerLabelsController.detailPage);
router.post('/bulk-delete', footerLabelsController.bulkDelete);
router.post("/add", upload.array("images"), footerLabelsController.add);
router.post("/edit/:id", footerLabelsController.edit);
router.post("/:id/social-link/add", upload.single("image"), footerLabelsController.addSocialLink);
router.get("/:id/social-link/:linkId", footerLabelsController.editSocialLinkPage);
router.post("/:id/social-link/:linkId/edit", upload.single("image"), footerLabelsController.editSocialLink);
router.post("/:id/social-link/:linkId/delete", footerLabelsController.deleteSocialLink);

export default router;