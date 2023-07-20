import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Contract {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('int')
    number: number;

    @Column('varchar')
    retirada: Timestamp;

    @Column('varchar')
    devolucao: Timestamp;

    @Column('varchar')
    observacao: string;

    @Column('varchar')
    tipo: string;

    @Column('varchar')
    status: string;
}