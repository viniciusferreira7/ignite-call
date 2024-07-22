/*
  Warnings:

  - You are about to drop the column `time_end_time_in_minutes` on the `user_time_intervals` table. All the data in the column will be lost.
  - You are about to drop the column `time_start_time_in_minutes` on the `user_time_intervals` table. All the data in the column will be lost.
  - Added the required column `time_end_in_minutes` to the `user_time_intervals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_start_in_minutes` to the `user_time_intervals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_time_intervals" DROP COLUMN "time_end_time_in_minutes",
DROP COLUMN "time_start_time_in_minutes",
ADD COLUMN     "time_end_in_minutes" INTEGER NOT NULL,
ADD COLUMN     "time_start_in_minutes" INTEGER NOT NULL;
