import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteraçãoEmFechado1691700950495 implements MigrationInterface {
    name = 'AlteraçãoEmFechado1691700950495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "fechado" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "fechado" SET DEFAULT now()`);
    }

}
