-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "client_userId_fkey";

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
