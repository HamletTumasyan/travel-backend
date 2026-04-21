import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import * as adminController from "../controllers/admin.js";

const router = Router();

router.get("/", auth, adminController.get_Admin_Dashboard_Page);

router.get("/login", adminController.login_get);
router.get('/logout', auth, adminController.logout)
router.get('/change-admin-name', auth, adminController.change_admin_name_get)
router.get('/change-admin-password', auth, adminController.change_admin_password_get)
router.post('/change-admin-name', auth, adminController.change_admin_name_post)
router.post("/login", adminController.login_post);
router.post('/change-admin-password', auth, adminController.change_admin_password_post)


export default router;