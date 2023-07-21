import { MigrationInterface, QueryRunner } from "typeorm";

export class Products1689973167693 implements MigrationInterface {
    name = 'Products1689973167693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "modelo" character varying NOT NULL, "color" character varying NOT NULL, "price" numeric NOT NULL, "totalValue" numeric NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contract" ADD "productsId" uuid`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_0901837739efc388127134454d5" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_0901837739efc388127134454d5"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "productsId"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
