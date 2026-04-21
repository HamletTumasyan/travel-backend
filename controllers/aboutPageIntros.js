import { prisma } from "../db/prisma.js"
const activeRoute = 'about-page';
const prismaTable = "aboutPageIntro";
const currentView = "aboutPageIntros";
const listPageTitle = "About Page Intros";
const createPageTitle = "Create About Page Intro";
const detailPageTitle = "Detail About Page Intro";

export const listPage = async (req, res, next) => {
    res.redirect('/admin/about-page');
}

export const createPage = async (req, res, next) => {
    try {
        const langs = await prisma.lang.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
        res.render(`${currentView}/create`, { title: createPageTitle, activeRoute, langs });
    } catch (error) {
        next(error);
    }
}

export const add = async (req, res, next) => {
    const data = req.body;

    try {
        await prisma[prismaTable].create({
            data,
        });
        res.redirect(`/admin/${activeRoute}`);
    } catch (error) {
        next(error);
    }
}

export const detailPage = async (req, res, next) => {
    const { id } = req.params;

    try {
        const data = await prisma[prismaTable].findUnique({
            where: {
                id,
            },
        });

        if (!data) {
            res.redirect(`/admin/about-page`);
        }
        const langs = await prisma.lang.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });

        res.render(`${currentView}/detail`, { data, title: detailPageTitle, activeRoute, langs });
    } catch (error) {
        next(error);
    }
}

export const edit = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        await prisma[prismaTable].update({
            where: {
                id,
            },
            data,
        });
        res.redirect(`/admin/${activeRoute}`);
    } catch (error) {
        next(error);
    }
}

export const bulkDelete = async (req, res, next) => {
    const { ids } = req.body;

    try {
        if (!ids) return res.redirect(`/admin/${activeRoute}`);

        const idArray = ids.split(',');

        await prisma[prismaTable].deleteMany({
            where: {
                id: {
                    in: idArray,
                },
            },
        });

        res.redirect(`/admin/${activeRoute}`);
    } catch (error) {
        next(error);
    }
};