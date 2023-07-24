import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductPopularity01690225997665 implements MigrationInterface {
    name = 'ProductPopularity01690225997665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "popularity" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "popularity" DROP DEFAULT`);
    }

}
