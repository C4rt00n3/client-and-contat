-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "telephone" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "telephone" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "instagram" VARCHAR(30),
    "telegarm" VARCHAR(15),
    "cleintId" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_telephone_key" ON "client"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "contact_email_key" ON "contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contact_telephone_key" ON "contact"("telephone");

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_cleintId_fkey" FOREIGN KEY ("cleintId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
