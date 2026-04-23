import { prisma } from "../db/prisma.js";
import bcrypt from "bcrypt";



export async function get_Admin_Dashboard_Page(req, res) {
    res.render("adminDashboard", { title: "Home", activeRoute: 'dashboard' });
}

export async function login_get(req, res) {
    const user = req.session.user;
    res.render("admin/login", { title: "Login", error: null, user });
}

export async function login_post(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render("admin/login", {
                title: "Login",
                error: "Please enter the correct username and password for a staff account.Note that both fields may be case-sensitive."
            });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
        };

        req.session.save((err) => {
            if (err) return next(err);
            res.redirect("/admin");
        });

    } catch (error) {
        next(error);
    }

}

export async function logout(req, res, next) {
    req.session.destroy(err => {
        if (err) return next(err);
        res.clearCookie("connect.sid");
        res.redirect("/admin/login");
    });
}

export async function change_admin_name_get(req, res) {
    res.render('admin/changeAdminName', {
        title: 'Change Admin Name',
        error: null,
        success: null,
        activeRoute: '',
    })

}

export async function change_admin_name_post(req, res) {
    const { adminName } = req.body;
    const { username } = req.session.user;

    try {
        const existing = await prisma.user.findUnique({
            where: {
                username: adminName
            },
        })

        if (existing) {
            return res.render('admin/changeAdminName', {
                title: 'Change Admin Name',
                error: 'Admin name already exists',
                success: null,
                activeRoute: '',
            })

        }


        await prisma.user.update({
            where: {
                username,
            },
            data: {
                username: adminName
            }
        })

        req.session.user.username = adminName;

        res.render('admin/changeAdminName', {
            title: 'Change Admin Name',
            error: null,
            success: 'Admin name updated successfully',
            activeRoute: '',
        })

    } catch (error) {
        next(error);
    }
}

export async function change_admin_password_get(req, res) {
    res.render('admin/changeAdminPassword', {
        title: 'Change Admin Password',
        error: null,
        success: null,
        activeRoute: '',
    })
}

export async function change_admin_password_post(req, res, next) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { username } = req.session.user;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return res.render("admin/changeAdminPassword", {
                title: "Change Admin Password",
                error: "Invalid old password",
                success: null,
                activeRoute: '',
            });
        }

        if (newPassword !== confirmPassword) {
            return res.render("admin/changeAdminPassword", {
                title: "Change Admin Password",
                error: "Passwords do not match",
                success: null,
                activeRoute: '',
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: {
                username,
            },
            data: {
                password: hashedPassword,
            },
        });

        res.render("admin/changeAdminPassword", {
            title: "Change Admin Password",
            error: null,
            success: "Password changed successfully",
            activeRoute: '',
        });

    } catch (error) {
        next(error);
    }
}