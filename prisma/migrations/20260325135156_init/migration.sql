-- CreateTable
CREATE TABLE "HomePagePackage" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomePagePackage_pkey" PRIMARY KEY ("id")
);
