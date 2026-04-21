import { prisma } from "../db/prisma.js";
import expressListEndpoints from "express-list-endpoints";
import apiRoute from '../routes/api.js'

export const apiList = (req, res, next) => {
    const data = expressListEndpoints(apiRoute);
    const version = 'v 1.0.0';
    const fullData = data.map(elem => `${req.baseFullUrl}/api${elem.path}`);
    fullData.shift();
    res.render('api', { title: 'TRAVEL API', version, data: fullData, layout: false });
}

export const logo = async (req, res, next) => {
    try {
        const data = await prisma.logo.findMany();
        res.status(200).json(data[0] || {});
    } catch (error) {
        next(error);
    }
}

export const navbars = async (req, res, next) => {
    const lang = req.query.lang || "";
    try {
        const data = await prisma.navbar.findMany({
            where: lang ? { lang } : undefined,
            orderBy: {
                createdAt: "asc"
            }
        });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const languages = async (req, res, next) => {
    try {
        const data = await prisma.lang.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}


export const homePageSliders = async (req, res, next) => {
    const lang = req.query.lang || "";
    try {
        const data = await prisma.homePageSlider.findMany({
            where: lang ? { lang } : undefined,
            orderBy: {
                createdAt: "asc"
            }
        });
        const fullData = data.map(elem => ({
            ...elem,
            image: `${req.baseFullUrl}${elem.image}`
        }))
        res.status(200).json(fullData);
    } catch (error) {
        next(error);
    }
}

export const homePagePackagesHeadings = async (req, res, next) => {
    const lang = req.query.lang || "";
    try {
        const data = await prisma.homePagePackagesHeading.findMany({
            where: lang ? { lang } : undefined,
            orderBy: { createdAt: "asc" }
        });
        res.status(200).json(data[0] || {});
    } catch (error) {
        next(error);
    }
}

export const homePagePackages = async (req, res, next) => {
    const lang = req.query.lang || "";
    try {
        const data = await prisma.homePagePackage.findMany({
            where: lang ? { lang } : undefined,
            orderBy: { createdAt: "asc" }
        });
        const fullData = data.map(elem => ({
            ...elem,
            image: `${req.baseFullUrl}${elem.image}`
        }));
        res.status(200).json(fullData);
    } catch (error) {
        next(error);
    }
}

export const aboutPageIntros = async (req, res, next) => {
    const lang = req.query.lang || "";
    try {
        const data = await prisma.aboutPageIntro.findMany({
            where: lang ? { lang } : undefined,
            orderBy: { createdAt: "asc" }
        });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const aboutTeamHeadings = async (req, res, next) => {
    const lang = req.query.lang || "";
    try {
        const data = await prisma.aboutTeamHeading.findMany({
            where: lang ? { lang } : undefined,
            orderBy: { createdAt: "asc" }
        });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const aboutPageTeams = async (req, res, next) => {
    const lang = req.query.lang || "";
    try {
        const data = await prisma.aboutPageTeam.findMany({
            where: lang ? { lang } : undefined,
            orderBy: { createdAt: "asc" }
        });
        const fullData = data.map(elem => ({
            ...elem,
            image: `${req.baseFullUrl}${elem.image}`
        }));
        res.status(200).json(fullData);
    } catch (error) {
        next(error);
    }
}

export const contactPageFormContents = async (req, res, next) => {
    const lang = req.query.lang || "";
    try {
        const data = await prisma.contactPageFormContent.findMany({
            where: lang ? { lang } : undefined,
            orderBy: { createdAt: "asc" }
        });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const footerLabels = async (req, res, next) => {
    const lang = req.query.lang || "";
    try {
        const data = await prisma.footerLabel.findMany({
            where: lang ? { lang } : undefined,
            orderBy: { createdAt: "asc" },
            include: {
                socialLinks: true
            }
        });
        const fullData = data.map(label => ({
            ...label,
            socialLinks: label.socialLinks.map(link => ({
                ...link,
                image: `${req.baseFullUrl}${link.image}`
            }))
        }));
        res.status(200).json(fullData[0] || {});
    } catch (error) {
        next(error);
    }
}
