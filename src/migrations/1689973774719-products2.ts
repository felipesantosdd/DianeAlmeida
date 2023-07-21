import { MigrationInterface, QueryRunner } from "typeorm";

export class Products21689973774719 implements MigrationInterface {
    name = 'Products21689973774719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "code" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "code"`);
    }

}
