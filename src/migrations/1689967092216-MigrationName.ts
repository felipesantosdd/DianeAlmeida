import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1689967092216 implements MigrationInterface {
    name = 'MigrationName1689967092216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contract" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "retirada" TIMESTAMP NOT NULL, "devolucao" TIMESTAMP NOT NULL, "observacao" character varying NOT NULL, "tipo" character varying NOT NULL, "status" character varying NOT NULL, "clientId" uuid NOT NULL, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "cpf" character varying(11) NOT NULL, "rank" integer NOT NULL DEFAULT '3', "phone" character varying NOT NULL, CONSTRAINT "UQ_9921dca81551c93e5a459ef03ce" UNIQUE ("cpf"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying(50) NOT NULL, "street" character varying(50) NOT NULL, "number" character varying(50) NOT NULL, "state" character varying(50) NOT NULL, "zip" character varying(50) NOT NULL, "district" character varying(50) NOT NULL, "reference" character varying(50) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_549fe94002a48f41e53ae210830" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_549fe94002a48f41e53ae210830"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "contract"`);
    }

}
