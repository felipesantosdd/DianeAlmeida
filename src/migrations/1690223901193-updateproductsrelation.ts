import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateproductsrelation1690223901193 implements MigrationInterface {
    name = 'Updateproductsrelation1690223901193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contract_products_product" ("contractId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_7fc5b20e4535893b84a04ee6bf7" PRIMARY KEY ("contractId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4232eae968bb80a73e01b64b21" ON "contract_products_product" ("contractId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c05da79f12982d3b518cb9d65" ON "contract_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "contract_products_product" ADD CONSTRAINT "FK_4232eae968bb80a73e01b64b215" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contract_products_product" ADD CONSTRAINT "FK_3c05da79f12982d3b518cb9d65d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract_products_product" DROP CONSTRAINT "FK_3c05da79f12982d3b518cb9d65d"`);
        await queryRunner.query(`ALTER TABLE "contract_products_product" DROP CONSTRAINT "FK_4232eae968bb80a73e01b64b215"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c05da79f12982d3b518cb9d65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4232eae968bb80a73e01b64b21"`);
        await queryRunner.query(`DROP TABLE "contract_products_product"`);
    }

}
