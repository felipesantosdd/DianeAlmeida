import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFechado1691600151285 implements MigrationInterface {
    name = 'AddFechado1691600151285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ADD "fechado" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "fechado"`);
    }

}
