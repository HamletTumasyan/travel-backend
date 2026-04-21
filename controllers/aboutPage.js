import { prisma } from "../db/prisma.js";
import path from "path";
import fs from "fs";

const activeRoute = 'about-page';
const currentView = "aboutPage";
const listPageTitle = "About Page";

export const listPage = async (req, res, next) => {
    try {
        const introsData = await prisma.aboutPageIntro.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
        const teamsData = await prisma.aboutPageTeam.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
        const headingsData = await prisma.aboutTeamHeading.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
        res.render(`${currentView}/index`, { introsData, teamsData, headingsData, title: listPageTitle, activeRoute });
    } catch (error) {
        next(error);
    }
}