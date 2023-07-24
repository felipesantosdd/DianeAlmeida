import { MigrationInterface, QueryRunner } from "typeorm";

export class ContractTotalValue1690224757199 implements MigrationInterface {
    name = 'ContractTotalValue1690224757199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ADD "total" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "total"`);
    }

}
