import { MigrationInterface, QueryRunner } from "typeorm";

export class FirtUser1689802777725 implements MigrationInterface {
    name = 'FirtUser1689802777725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "cpf" character varying(11) NOT NULL, "description" text, "price" integer NOT NULL, CONSTRAINT "UQ_4245ac34add1ceeb505efc98777" UNIQUE ("cpf"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
