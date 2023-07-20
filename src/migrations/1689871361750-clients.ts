import { MigrationInterface, QueryRunner } from "typeorm";

export class Clients1689871361750 implements MigrationInterface {
    name = 'Clients1689871361750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "cpf" character varying(11) NOT NULL, "rg" text, "rank" integer NOT NULL DEFAULT '3', "phone" character varying NOT NULL, CONSTRAINT "UQ_9921dca81551c93e5a459ef03ce" UNIQUE ("cpf"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
