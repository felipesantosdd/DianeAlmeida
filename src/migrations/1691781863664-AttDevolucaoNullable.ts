import { MigrationInterface, QueryRunner } from "typeorm";

export class AttDevolucaoNullable1691781863664 implements MigrationInterface {
    name = 'AttDevolucaoNullable1691781863664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "devolucao" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "devolucao" SET NOT NULL`);
    }

}
