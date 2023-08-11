import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExtraValue1691777094910 implements MigrationInterface {
    name = 'AddExtraValue1691777094910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Verifica se a coluna "extra" já existe antes de tentar adicioná-la
        const table = await queryRunner.getTable("contract");
        if (!table.columns.find(column => column.name === "extra")) {
            await queryRunner.query(`ALTER TABLE "contract" ADD "extra" numeric NOT NULL DEFAULT '0'`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "extra"`);
    }

}
