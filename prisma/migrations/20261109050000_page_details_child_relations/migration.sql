-- Preserve the existing one-per-product child rows while allowing multiple entries.
ALTER TABLE "featureHighlights" DROP CONSTRAINT "featureHighlights_id_fkey";
ALTER TABLE "specifications" DROP CONSTRAINT "specifications_id_fkey";

ALTER TABLE "featureHighlights" ADD COLUMN "page_details_id" TEXT;
ALTER TABLE "specifications" ADD COLUMN "page_details_id" TEXT;

UPDATE "featureHighlights" SET "page_details_id" = "id";
UPDATE "specifications" SET "page_details_id" = "id";

ALTER TABLE "featureHighlights" ALTER COLUMN "page_details_id" SET NOT NULL;
ALTER TABLE "specifications" ALTER COLUMN "page_details_id" SET NOT NULL;

CREATE INDEX "featureHighlights_page_details_id_idx" ON "featureHighlights"("page_details_id");
CREATE INDEX "specifications_page_details_id_idx" ON "specifications"("page_details_id");

ALTER TABLE "featureHighlights" ADD CONSTRAINT "featureHighlights_page_details_id_fkey" FOREIGN KEY ("page_details_id") REFERENCES "pageDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "specifications" ADD CONSTRAINT "specifications_page_details_id_fkey" FOREIGN KEY ("page_details_id") REFERENCES "pageDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
