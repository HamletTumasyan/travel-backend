import { prisma } from "../db/prisma.js"
const activeRoute = 'langs';
const prismaTable = "lang";
const currentView = "langs";
const listPageTitle = "Languages";
const createPageTitle = "Create Language";
const detailPageTitle = "Detail Language";



export const listPage = async (req, res, next) => {
    try {
        const data = await prisma[prismaTable].findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
        res.render(`${currentView}/index`, { data, title: listPageTitle, activeRoute });
    } catch (error) {
        next(error);
    }
}

export const createPage = (req, res) => {
    res.render(`${currentView}/create`, { title: createPageTitle, activeRoute });
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
            res.redirect(`/admin/${activeRoute}`);
        }

        res.render(`${currentView}/detail`, { data, title: detailPageTitle, activeRoute });
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