import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("clients")
export class Product {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 60 })
    name: string;

    @Column({ length: 11, unique: true })
    cpf: string;

    @Column({ type: "text", nullable: true })
    description?: string | undefined | null;

    @Column({ type: "integer" })
    price: number;
}