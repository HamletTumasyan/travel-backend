import { prisma } from "../db/prisma.js";
import path from "path";
import fs from "fs";

const activeRoute = 'footer-labels';
const prismaTable = "footerLabel";
const currentView = "footerLabels";
const listPageTitle = "Footer Labels";
const createPageTitle = "Create Footer Label";
const detailPageTitle = "Detail Footer Label";

export const listPage = async (req, res, next) => {
    try {
        const data = await prisma[prismaTable].findMany({
            orderBy: {
                createdAt: "asc"
            },
            include: {
                socialLinks: true
            }
        });
        res.render(`${currentView}/index`, { data, title: listPageTitle, activeRoute });
    } catch (error) {
        next(error);
    }
};

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
};

export const add = async (req, res, next) => {
    const data = req.body;
    const files = req.files;
    try {
        const newLabel = await prisma[prismaTable].create({
            data: {
                lang: data.lang,
                title: data.title,
                credit: data.credit
            }
        });

        if (files && files.length > 0) {
            let urls = data.urls;
            if (urls) {
                if (typeof urls === 'string') {
                    urls = [urls];
                }
                const socialLinksData = [];
                for (let i = 0; i < files.length; i++) {
                    if (urls[i]) {
                        socialLinksData.push({
                            footerLabelId: newLabel.id,
                            url: urls[i],
                            image: `/images/${files[i].filename}`
                        });
                    }
                }
                if (socialLinksData.length > 0) {
                    await prisma.socialLink.createMany({
                        data: socialLinksData
                    });
                }
            }
        }

        res.redirect(`/admin/${activeRoute}`);
    } catch (error) {
        next(error);
    }
};

export const detailPage = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await prisma[prismaTable].findUnique({
            where: { id: Number(id) },
            include: { socialLinks: true }
        });

        if (!data) {
            return res.redirect(`/admin/${activeRoute}`);
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
};

export const edit = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        await prisma[prismaTable].update({
            where: { id: Number(id) },
            data: {
                lang: data.lang,
                title: data.title,
                credit: data.credit
            }
        });
        res.redirect(`/admin/${activeRoute}`);
    } catch (error) {
        next(error);
    }
};

export const bulkDelete = async (req, res, next) => {
    const { ids } = req.body;
    try {
        if (!ids) return res.redirect(`/admin/${activeRoute}`);
        const idArray = ids.split(',').map(id => Number(id));
        await prisma[prismaTable].deleteMany({
            where: { id: { in: idArray } }
        });
        res.redirect(`/admin/${activeRoute}`);
    } catch (error) {
        next(error);
    }
};

export const addSocialLink = async (req, res, next) => {
    const { id } = req.params;
    const { url } = req.body;
    const file = req.file;

    try {
        await prisma.socialLink.create({
            data: {
                footerLabelId: Number(id),
                url: url || "",
                image: file ? `/images/${file.filename}` : ""
            }
        });

        res.redirect(`/admin/${activeRoute}/${id}`);
    } catch (error) {
        next(error);
    }
};

export const deleteSocialLink = async (req, res, next) => {
    const { id, linkId } = req.params;

    try {
        const link = await prisma.socialLink.findUnique({
            where: { id: Number(linkId) }
        });

        if (link && link.image) {
            const imagePath = path.join(process.cwd(), 'public', link.image.replace(/^\/+/, ''));
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }

        await prisma.socialLink.delete({
            where: { id: Number(linkId) }
        });

        res.redirect(`/admin/${activeRoute}/${id}`);
    } catch (error) {
        next(error);
    }
};

export const editSocialLinkPage = async (req, res, next) => {
    const { id, linkId } = req.params;
    try {
        const data = await prisma.socialLink.findUnique({
            where: { id: Number(linkId) }
        });
        if (!data) return res.redirect(`/admin/${activeRoute}/${id}`);
        
        res.render(`${currentView}/editSocialLink`, { data, title: "Edit Social Link", activeRoute, footerLabelId: id });
    } catch (error) {
        next(error);
    }
};

export const editSocialLink = async (req, res, next) => {
    const { id, linkId } = req.params;
    const { url, oldImage } = req.body;
    const file = req.file;

    try {
        const imagePath = file ? `/images/${file.filename}` : oldImage;

        await prisma.socialLink.update({
            where: { id: Number(linkId) },
            data: {
                url,
                image: imagePath
            }
        });

        if (file && oldImage) {
            const oldImgPath = path.join(process.cwd(), "public", oldImage.replace(/^\/+/, ""));
            fs.unlink(oldImgPath, (err) => {
                if (err) console.error("Error deleting old social link image:", err);
            });
        }

        res.redirect(`/admin/${activeRoute}/${id}`);
    } catch (error) {
        next(error);
    }
};