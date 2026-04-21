import { prisma } from "../db/prisma.js";
import path from "path";
import fs from "fs";

const activeRoute = 'home-page-packages';
const prismaTable = "homePagePackage";
const currentView = "homePagePackages";
const listPageTitle = "Home Page Packages";
const createPageTitle = "Create Home Page Package";
const detailPageTitle = "Detail Home Page Package";

export const listPage = async (req, res, next) => {
    try {
        const packagesData = await prisma[prismaTable].findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
        const headingsData = await prisma.homePagePackagesHeading.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
        res.render(`${currentView}/index`, { packagesData, headingsData, title: listPageTitle, activeRoute });
    } catch (error) {
        next(error);
    }
}

export const createPage = async (req, res) => {

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
    const file = req.file;

    try {

        if (!file) {
            return res.status(400).send("No file uploaded");
        }

        await prisma[prismaTable].create({
            data: {
                ...data,
                image: `/images/${file.filename}`,
            }
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
    const file = req.file;

    const imagePath = file ? `/images/${file.filename}` : data.oldImage;

    await prisma[prismaTable].update({
        where: {
            id,
        },
        data: {
            lang: data.lang,
            discount: data.discount,
            image: imagePath,
            title: data.title,
            price: data.price,
        }
    });

    if (file && data.oldImage) {
        const oldImagePath = path.join(process.cwd(), "public", data.oldImage.replace(/^\/+/, ""));
        fs.unlink(oldImagePath, (err) => {
            if (err) {
                console.error("Error deleting old image:", err);
            }
        });
    }

    res.redirect(`/admin/${activeRoute}`);

}
export const bulkDelete = async (req, res, next) => {
    const { ids } = req.body;


    try {
        if (!ids) return res.redirect(`/admin/${activeRoute}`);

        const idArray = ids.split(',');

        const items = await prisma[prismaTable].findMany({
            where: {
                id: {
                    in: idArray,
                },
            },
        });

        for (const item of items) {
            if (item.image) {
                const imagePath = path.join(
                    process.cwd(),
                    'public',
                    item.image.replace(/^\/+/, '')
                );

                try {
                    await fs.promises.unlink(imagePath);
                } catch (err) {
                    console.error('Failed to delete image', err.message);
                }
            }
        }

        await prisma[prismaTable].deleteMany({
            where: {
                id: {
                    in: idArray,
                },
            },
        })

        res.redirect(`/admin/${activeRoute}`);
    } catch (error) {
        next(error);
    }
};