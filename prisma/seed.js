import { prisma } from "../db/prisma.js";
import fs from "fs";
import path from "path";

// Read db.json
const dbPath = path.join(process.cwd(), "db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

async function main() {
    console.log('Starting seed process...');

    // 3. Home Page Packages Headings
    console.log('Seeding Home Page Packages Headings...');
    for (const item of db.home_page_packages_headings || []) {
        await prisma.homePagePackagesHeading.create({
            data: { lang: item.lang, title: item.title }
        });
    }

    // 4. Home Page Packages
    console.log('Seeding Home Page Packages...');
    for (const item of db.homepage_packages || []) {
        await prisma.homePagePackage.create({
            data: {
                lang: item.lang,
                discount: String(item.discount),
                image: item.image,
                title: item.title,
                price: String(item.price)
            }
        });
    }

    // 5. About Page Intros
    console.log('Seeding About Page Intros...');
    for (const item of db.aboutpage_intros || []) {
        await prisma.aboutPageIntro.create({
            data: { lang: item.lang, title: item.title, descr: item.descr }
        });
    }

    // 6. About Team Headings
    console.log('Seeding About Team Headings...');
    for (const item of db.aboutpage_team_headings || []) {
        // Handle missing lang in db.json based on id
        let lang = "en";
        if (item.id === 2 || item.title.includes("Մեր")) lang = "am";

        await prisma.aboutTeamHeading.create({
            data: { lang: lang, title: item.title }
        });
    }

    // 7. About Page Teams
    console.log('Seeding About Page Teams...');
    for (const item of db.aboutpage_teams || []) {
        await prisma.aboutPageTeam.create({
            data: { lang: item.lang, image: item.image, name: item.name, profession: item.profession }
        });
    }

    // 8. Contact Page Form Contents
    console.log('Seeding Contact Page Form Contents...');
    for (const item of db.contactpage_form_contents || []) {
        await prisma.contactPageFormContent.create({
            data: {
                lang: item.lang,
                title: item.title,
                form_input_name_placeholder: item.form_input_name_placeholder,
                form_input_email_placeholder: item.form_input_email_placeholder,
                form_input_message_placeholder: item.form_message_placeholder || item.form_input_message_placeholder,
                btn_text: item.btn_text,
                form_send_successfully: item.form_send_successfully,
                form_send_error: item.form_send_error
            }
        });
    }

    // 9. Footer Labels & Social Links
    console.log('Seeding Footer Labels and Social Links...');
    for (const item of db.footer_labels || []) {
        const newFooter = await prisma.footerLabel.create({
            data: { lang: item.lang, title: item.title, credit: item.credit }
        });

        if (item.social_links && item.social_links.length > 0) {
            const socialLinksData = item.social_links.map(link => ({
                footerLabelId: newFooter.id,
                image: link.image,
                url: link.url
            }));
            await prisma.socialLink.createMany({
                data: socialLinksData
            });
        }
    }

    console.log('Seeding completed successfully!');
}

main().catch(e => {
    console.error("Error running seed: ", e);
    process.exit(1);
});
