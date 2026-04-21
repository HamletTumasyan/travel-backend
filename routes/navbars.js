import {Router} from "express";
import * as navbarController from "../controllers/navbars.js";

const router = Router();

router.get("/", navbarController.listPage);
router.get("/create", navbarController.createPage);
router.get("/:id", navbarController.detailPage);
router.post("/add", navbarController.add);
router.post("/edit/:id", navbarController.edit);
router.post('/bulk-delete',navbarController.bulkDelete);



export default router;