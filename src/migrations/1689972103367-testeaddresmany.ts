import { MigrationInterface, QueryRunner } from "typeorm";

export class Testeaddresmany1689972103367 implements MigrationInterface {
    name = 'Testeaddresmany1689972103367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "clientId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_3d3e29e99d821fd75d7cb117e04" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_3d3e29e99d821fd75d7cb117e04"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "clientId"`);
    }

}
