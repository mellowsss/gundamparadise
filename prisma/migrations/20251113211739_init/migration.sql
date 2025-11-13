-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Kit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "series" TEXT,
    "scale" TEXT,
    "releaseDate" DATETIME,
    "imageUrl" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "logoUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "StoreLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kitId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StoreLink_kitId_fkey" FOREIGN KEY ("kitId") REFERENCES "Kit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StoreLink_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PriceEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kitId" TEXT NOT NULL,
    "storeId" TEXT,
    "price" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "recordedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PriceEntry_kitId_fkey" FOREIGN KEY ("kitId") REFERENCES "Kit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "kitId" TEXT NOT NULL,
    "targetPrice" REAL,
    "notes" TEXT,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WishlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WishlistItem_kitId_fkey" FOREIGN KEY ("kitId") REFERENCES "Kit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CollectionItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "kitId" TEXT NOT NULL,
    "purchasePrice" REAL,
    "purchaseDate" DATETIME,
    "notes" TEXT,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CollectionItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CollectionItem_kitId_fkey" FOREIGN KEY ("kitId") REFERENCES "Kit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PriceAlert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "kitId" TEXT NOT NULL,
    "targetPrice" REAL,
    "alertType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "triggeredAt" DATETIME,
    CONSTRAINT "PriceAlert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PriceAlert_kitId_fkey" FOREIGN KEY ("kitId") REFERENCES "Kit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Kit_grade_idx" ON "Kit"("grade");

-- CreateIndex
CREATE INDEX "Kit_name_idx" ON "Kit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");

-- CreateIndex
CREATE INDEX "StoreLink_kitId_idx" ON "StoreLink"("kitId");

-- CreateIndex
CREATE UNIQUE INDEX "StoreLink_kitId_storeId_key" ON "StoreLink"("kitId", "storeId");

-- CreateIndex
CREATE INDEX "PriceEntry_kitId_idx" ON "PriceEntry"("kitId");

-- CreateIndex
CREATE INDEX "PriceEntry_recordedAt_idx" ON "PriceEntry"("recordedAt");

-- CreateIndex
CREATE INDEX "WishlistItem_userId_idx" ON "WishlistItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_userId_kitId_key" ON "WishlistItem"("userId", "kitId");

-- CreateIndex
CREATE INDEX "CollectionItem_userId_idx" ON "CollectionItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionItem_userId_kitId_key" ON "CollectionItem"("userId", "kitId");

-- CreateIndex
CREATE INDEX "PriceAlert_userId_idx" ON "PriceAlert"("userId");

-- CreateIndex
CREATE INDEX "PriceAlert_kitId_idx" ON "PriceAlert"("kitId");

-- CreateIndex
CREATE INDEX "PriceAlert_isActive_idx" ON "PriceAlert"("isActive");
