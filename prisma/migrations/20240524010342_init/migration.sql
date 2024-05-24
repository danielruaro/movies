-- CreateTable
CREATE TABLE "movies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "winner" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "studios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "producers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_movie_producers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_movie_producers_A_fkey" FOREIGN KEY ("A") REFERENCES "movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_movie_producers_B_fkey" FOREIGN KEY ("B") REFERENCES "producers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_movie_studios" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_movie_studios_A_fkey" FOREIGN KEY ("A") REFERENCES "movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_movie_studios_B_fkey" FOREIGN KEY ("B") REFERENCES "studios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "studios_name_key" ON "studios"("name");

-- CreateIndex
CREATE UNIQUE INDEX "producers_name_key" ON "producers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_movie_producers_AB_unique" ON "_movie_producers"("A", "B");

-- CreateIndex
CREATE INDEX "_movie_producers_B_index" ON "_movie_producers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_movie_studios_AB_unique" ON "_movie_studios"("A", "B");

-- CreateIndex
CREATE INDEX "_movie_studios_B_index" ON "_movie_studios"("B");
