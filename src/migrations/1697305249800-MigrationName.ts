import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1697305249800 implements MigrationInterface {
    name = 'MigrationName1697305249800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "image" character varying NOT NULL DEFAULT 'https://www.prontaprafesta.com/wp-content/uploads/2018/04/vestido-estilo-princesa-ombro.jpg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
    }

}
