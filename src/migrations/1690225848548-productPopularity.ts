import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductPopularity1690225848548 implements MigrationInterface {
    name = 'ProductPopularity1690225848548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "popularity" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "popularity"`);
    }

}
