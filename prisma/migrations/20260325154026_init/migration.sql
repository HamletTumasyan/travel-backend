-- CreateTable
CREATE TABLE "FooterLabel" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "credit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FooterLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" SERIAL NOT NULL,
    "footerLabelId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_footerLabelId_fkey" FOREIGN KEY ("footerLabelId") REFERENCES "FooterLabel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
