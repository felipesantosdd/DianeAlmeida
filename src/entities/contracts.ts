import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./clients";
import { Product } from "./products";

@Entity()
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    number: number;

    @Column('timestamp')
    retirada: Date;

    @Column('timestamp')
    devolucao: Date;

    @Column('varchar')
    observacao: string;

    @Column('varchar')
    tipo: string;

    @Column('varchar')
    status: string;

    @ManyToOne(() => Client, (client) => client.contracts, { nullable: false })
    client: Client;

    @ManyToOne(() => Product, (product) => product.contracts)
    products: Product[];
}
