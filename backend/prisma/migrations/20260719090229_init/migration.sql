-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('mobile', 'desktop', 'web');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('local', 'deployed');

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT,
    "categorie" TEXT,
    "description" TEXT,
    "role" TEXT,
    "client" TEXT,
    "type" "ProjectType" NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'local',
    "year" INTEGER,
    "image" TEXT,
    "link" TEXT,
    "download_link" TEXT,
    "in_progress" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "icon_name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tools" (
    "project_id" INTEGER NOT NULL,
    "tool_id" INTEGER NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "project_tools_pkey" PRIMARY KEY ("project_id","tool_id")
);

-- CreateTable
CREATE TABLE "screenshots" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "src" TEXT NOT NULL,
    "titre" TEXT,
    "caption" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "screenshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screenshot_features" (
    "id" SERIAL NOT NULL,
    "screenshot_id" INTEGER NOT NULL,
    "texte" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "screenshot_features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tools_label_key" ON "tools"("label");

-- AddForeignKey
ALTER TABLE "project_tools" ADD CONSTRAINT "project_tools_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tools" ADD CONSTRAINT "project_tools_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screenshots" ADD CONSTRAINT "screenshots_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screenshot_features" ADD CONSTRAINT "screenshot_features_screenshot_id_fkey" FOREIGN KEY ("screenshot_id") REFERENCES "screenshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
