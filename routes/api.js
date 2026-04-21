import { Router } from "express";
import * as apiController from "../controllers/api.js";

const router = Router();

router.get('/', apiController.apiList)
router.get("/logos", apiController.logo);
router.get("/navbars", apiController.navbars);
router.get("/languages", apiController.languages);
router.get("/home-page-sliders", apiController.homePageSliders);
router.get("/home-page-packages-headings", apiController.homePagePackagesHeadings);
router.get("/home-page-packages", apiController.homePagePackages);
router.get("/about-page-intros", apiController.aboutPageIntros);
router.get("/about-team-headings", apiController.aboutTeamHeadings);
router.get("/about-page-teams", apiController.aboutPageTeams);
router.get("/contact-page-form-contents", apiController.contactPageFormContents);
router.get("/footer-labels", apiController.footerLabels);

export default router;