-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_folderId_fkey";

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders"("folder_id") ON DELETE CASCADE ON UPDATE CASCADE;
