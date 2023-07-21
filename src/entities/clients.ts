import "reflect-metadata";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contract } from "./contracts";
import { Address } from "./address";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, type: "varchar" })
    name: string;

    @Column({ length: 11, unique: true, type: "varchar" })
    cpf: string | null;

    @Column({ type: "integer", default: 3 })
    rank: number;

    @Column({ type: "varchar" })
    phone: string;

    @OneToMany(() => Contract, (contract => contract.client), { cascade: true })
    contracts: Contract[];

    @OneToMany(() => Address, (address => address.client), { cascade: true })
    address: Address[];
}
