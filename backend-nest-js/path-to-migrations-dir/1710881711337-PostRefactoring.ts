import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1710881711337 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE "Vehicle" RENAME COLUMN "yearOfProduction" TO "year"`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
