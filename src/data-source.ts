import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { ConnectionOptions, DataSource } from "typeorm"; // Correção aqui

const dataSourceConfig = (): ConnectionOptions => { // Correção aqui
    const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
    const migrationPath: string = path.join(__dirname, "./migrations/**.{ts,js}");

    const dbUrl: string | undefined = process.env.DATABASE_URL;

    if (!dbUrl) {
        throw new Error("Missing env var: 'DATABASE_URL'");
    }

    return {
        type: "postgres",
        url: dbUrl,
        logging: true,
        entities: [entitiesPath], // Correção aqui
        migrations: [migrationPath],
    };
};

const AppDataSource = new DataSource(dataSourceConfig());

export { AppDataSource };
