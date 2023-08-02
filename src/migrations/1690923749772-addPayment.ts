import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPayment1690923749772 implements MigrationInterface {
    name = 'AddPayment1690923749772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "pagamento" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "pagamento" SET DEFAULT '3'`);
    }

}
