import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Client {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({ length: 60, type: "varchar" })
    name!: string;

    @Column({ length: 11, unique: true, type: "varchar" })
    cpf!: string | null;

    @Column({ type: "text", nullable: true })
    rg!: string | null;

    @Column({ type: "integer", default: 3 })
    rank!: number;

    @Column({ type: "varchar" })
    phone!: string;
}