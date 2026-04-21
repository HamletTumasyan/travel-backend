-- CreateTable
CREATE TABLE "HomePagePackagesHeading" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomePagePackagesHeading_pkey" PRIMARY KEY ("id")
);
