import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import apiRoute from "./api.js";
import adminRoute from "./admin.js";
import logoRoute from "./logos.js";
import navbarRoute from "./navbars.js";
import langRoute from "./langs.js";
import homePageSliderRoute from "./homePageSliders.js";
import homePagePckgsHeadRoute from "./homePagePckgsHead.js";
import homePagePckgsRoute from "./homePagePackages.js";
import aboutPageIntrosRoute from "./aboutPageIntros.js";
import aboutPageTeamsRoute from "./aboutPageTeams.js";
import aboutTeamHeadingsRoute from "./aboutTeamHeadings.js";
import aboutPageRoute from "./aboutPage.js";
import contactPageRoute from "./contactPage.js";
import footerLabelsRoute from "./footerLabels.js";

const router = Router();

router.get('/', (req, res) => res.render('index', { layout: false }))
router.use("/api", apiRoute);

router.use("/admin", adminRoute);
router.use('/admin', auth);
router.use("/admin/logo", logoRoute);
router.use("/admin/navbar", navbarRoute);
router.use("/admin/langs", langRoute);
router.use("/admin/home-page-sliders", homePageSliderRoute);
router.use("/admin/home-page-pckgs-head", homePagePckgsHeadRoute);
router.use("/admin/home-page-packages", homePagePckgsRoute);
router.use("/admin/about-page-intros", aboutPageIntrosRoute);
router.use("/admin/about-page-teams", aboutPageTeamsRoute);
router.use("/admin/about-team-headings", aboutTeamHeadingsRoute);
router.use("/admin/about-page", aboutPageRoute);
router.use("/admin/contact-page", contactPageRoute);
router.use("/admin/footer-labels", footerLabelsRoute);


export default router;