import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1691169334892 implements MigrationInterface {
    name = 'MigrationName1691169334892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "modelo" character varying NOT NULL, "color" character varying NOT NULL, "code" numeric NOT NULL, "price" numeric NOT NULL, "totalValue" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "popularity" numeric NOT NULL DEFAULT '0', CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "retirada" TIMESTAMP NOT NULL, "devolucao" TIMESTAMP NOT NULL, "observacao" character varying NOT NULL, "tipo" character varying NOT NULL, "status" character varying NOT NULL, "total" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "pagamento" numeric NOT NULL, "clientId" uuid NOT NULL, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "cpf" character varying(11) NOT NULL, "rank" integer NOT NULL DEFAULT '3', "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9921dca81551c93e5a459ef03ce" UNIQUE ("cpf"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying(50) NOT NULL, "street" character varying(50) NOT NULL, "number" character varying(50) NOT NULL, "state" character varying(50) NOT NULL, "zip" character varying(50) NOT NULL, "district" character varying(50) NOT NULL, "reference" character varying(50) NOT NULL, "clientId" uuid NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract_products_product" ("contractId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_7fc5b20e4535893b84a04ee6bf7" PRIMARY KEY ("contractId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4232eae968bb80a73e01b64b21" ON "contract_products_product" ("contractId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c05da79f12982d3b518cb9d65" ON "contract_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_549fe94002a48f41e53ae210830" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_3d3e29e99d821fd75d7cb117e04" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_products_product" ADD CONSTRAINT "FK_4232eae968bb80a73e01b64b215" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contract_products_product" ADD CONSTRAINT "FK_3c05da79f12982d3b518cb9d65d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract_products_product" DROP CONSTRAINT "FK_3c05da79f12982d3b518cb9d65d"`);
        await queryRunner.query(`ALTER TABLE "contract_products_product" DROP CONSTRAINT "FK_4232eae968bb80a73e01b64b215"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_3d3e29e99d821fd75d7cb117e04"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_549fe94002a48f41e53ae210830"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c05da79f12982d3b518cb9d65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4232eae968bb80a73e01b64b21"`);
        await queryRunner.query(`DROP TABLE "contract_products_product"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
