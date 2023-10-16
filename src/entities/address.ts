import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./clients";

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50, type: "varchar" })
    city: string;

    @Column({ length: 50, type: "varchar" })
    street: string;

    @Column({ length: 50, type: "varchar" })
    number: string;

    @Column({ length: 50, type: "varchar" })
    state: string;

    @Column({ length: 50, type: "varchar" })
    zip: string;

    @Column({ length: 50, type: "varchar" })
    district: string;

    @Column({ length: 50, type: "varchar" })
    reference: string;

    @ManyToOne(() => Client, (client) => client.address, { nullable: false })
    client: Client;
}
