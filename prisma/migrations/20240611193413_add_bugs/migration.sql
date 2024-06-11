-- CreateTable
CREATE TABLE "bugs_or_features" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bugs_or_features_pkey" PRIMARY KEY ("id")
);
