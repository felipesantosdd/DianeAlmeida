import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column('numeric', { default: 0 })
    extra: number;

    @Column('numeric')
    total: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp" })
    fechado: Date;

    @Column('numeric')
    pagamento: number;

    @ManyToOne(() => Client, (client) => client.contracts, { nullable: false })
    client: Client;

    @ManyToMany(() => Product, (product) => product.contracts)
    @JoinTable()
    products: Product[];

}
