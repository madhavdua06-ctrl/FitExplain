-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Topic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "simpleContent" TEXT NOT NULL,
    "scientificContent" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "sources" JSONB NOT NULL DEFAULT [],
    "keyTakeaways" JSONB NOT NULL DEFAULT [],
    "commonMistakes" JSONB NOT NULL DEFAULT [],
    "faqs" JSONB NOT NULL DEFAULT [],
    "quiz" JSONB NOT NULL DEFAULT [],
    "quickFacts" JSONB NOT NULL DEFAULT [],
    "conclusionSimple" TEXT,
    "conclusionScientific" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Topic" ("category", "commonMistakes", "createdAt", "faqs", "id", "keyTakeaways", "order", "quiz", "scientificContent", "shortDescription", "simpleContent", "slug", "sources", "title", "updatedAt") SELECT "category", "commonMistakes", "createdAt", "faqs", "id", "keyTakeaways", "order", "quiz", "scientificContent", "shortDescription", "simpleContent", "slug", "sources", "title", "updatedAt" FROM "Topic";
DROP TABLE "Topic";
ALTER TABLE "new_Topic" RENAME TO "Topic";
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
