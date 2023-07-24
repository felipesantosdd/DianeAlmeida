import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateContractsandProducts1690223536524 implements MigrationInterface {
    name = 'UpdateContractsandProducts1690223536524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_0901837739efc388127134454d5"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "productsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ADD "productsId" uuid`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_0901837739efc388127134454d5" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
