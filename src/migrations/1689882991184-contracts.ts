import { MigrationInterface, QueryRunner } from "typeorm";

export class Contracts1689882991184 implements MigrationInterface {
    name = 'Contracts1689882991184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contract" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "retirada" character varying NOT NULL, "devolucao" character varying NOT NULL, "observacao" character varying NOT NULL, "tipo" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contract"`);
    }

}
